import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { MessageDto } from './dto/MessageDto';
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Extracts the JWT token from WebSocket handshake (query or headers)
   */
  private extractToken(client: Socket): string | null {
    const tokenFromQuery = client.handshake.query['Authorization'];
    const tokenFromHeaders = client.handshake.headers['authorization'];

    const token = Array.isArray(tokenFromQuery)
      ? tokenFromQuery[0].split('Bearer ')[1]
      : tokenFromQuery?.split('Bearer ')[1] ||
        tokenFromHeaders?.split('Bearer ')[1];

    if (!token) {
      return 'error';
    }
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const senderId = decoded.sub;
    return senderId;
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() messageDto: MessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = this.extractToken(client);
    try {
      // Save the message to the database
      const message = this.chatService.saveMessage(senderId, messageDto);
      return message; // Optionally return the saved message
    } catch (error) {
      // Log the error and send an error message to the sender
      console.error('Error decoding token or sending message:', error.message);
      this.server
        .to(client.id)
        .emit('error', { message: 'Failed to decode token or send message' });
    }
  }

  handleConnection(client: Socket) {
   
    const headers = client.handshake.headers;
    console.log('Handshake headers:', headers);

    const token = headers['authorization']?.split('Bearer ')[1];
    console.log('Token:', token); // Log the token

    if (!token) {
      console.log('No token provided');
      return;
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
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
