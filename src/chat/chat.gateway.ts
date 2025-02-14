import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,

} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/MessageDto';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from './guards/auth.guard'; // Import the guard

@WebSocketGateway({ namespace: 'chat' })
@Injectable()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) {}

  @UseGuards(WsJwtGuard) 
  handleConnection(client: Socket) {
    const userId = client.data.userId; 
    if (userId) {
      client.join(`user_${userId}`);
      this.logger.log(`User ${userId} connected`);
    }
  }

  @UseGuards(WsJwtGuard) 
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() messageDto: MessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId; 

    try {
      const message = await this.chatService.saveMessage(userId, messageDto);
      this.server.emit('message', message); 
    } catch (error) {
      this.logger.error('Error saving message:', error.message);
      this.server
        .to(client.id)
        .emit('error', { message: 'Failed to save message' });
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}