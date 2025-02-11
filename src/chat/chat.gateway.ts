import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { MessageDto } from './dto/MessageDto';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService
  ) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data:{ receiverId: number ,message:string},
    @ConnectedSocket() client: Socket
  ) {
    // Extract the token from the query parameter
    const token = Array.isArray(client.handshake.query['Authorization'])
      ? client.handshake.query['Authorization'][0].split('Bearer ')[1]
      : client.handshake.query['Authorization']?.split('Bearer ')[1];
    
   
    
    if (!token) {
      this.server.to(client.id).emit('error', { messages: 'Authentication token not provided' });
      return;
    }
  
    try {
      // Decode the token to get the senderId
      const decoded = this.jwtService.verify(token,{secret:process.env.JWT_SECRET});
      const senderId = decoded.sub;
      // Save the message to the database
      const message = this.chatService.saveMessage(senderId, data.receiverId, data.message);
      return message; // Optionally return the saved message
    } catch (error) {
      // Log the error and send an error message to the sender
      console.error('Error decoding token or sending message:', error.message);
      this.server.to(client.id).emit('error', { message: 'Failed to decode token or send message' });
    }
  }
  
  handleConnection(client: Socket) {
    const headers = client.handshake.headers;
    console.log('Handshake headers:', headers);
  
    const token = headers['authorization']?.split('Bearer ')[1];
    console.log('Token:', token);  // Log the token
  
    if (!token) {
      console.log('No token provided');
      return;
    }
  
    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.userId; // Assuming userId is in the token payload
  
      if (userId) {
        client.join(`user_${userId}`);
        console.log(`User ${userId} connected`);
      }
    } catch (error) {
      console.log('Error decoding token:', error.message);
    }
  }
  
  // Handle disconnect event
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}

