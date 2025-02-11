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
      async saveMessage(senderId, messageDto) {
        console
        const chatMessage = await this.chatRepository.save({
          ...messageDto,
          senderId,
        });
        console.log(chatMessage);
        return chatMessage;
      }
    
}
