import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ChatMessage } from './chatMessage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from './dto/MessageDto';
@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatMessage)
        private readonly chatRepository: Repository<ChatMessage>,
      ) {}
      async saveMessage(senderId, receiverId, message) {
        console
        const chatMessage = await this.chatRepository.save({
          senderId: senderId,
          receiverId: receiverId,
          message: message
        });
        console.log(chatMessage);
        return chatMessage;
      }
    
}
