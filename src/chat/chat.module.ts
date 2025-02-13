import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ChatMessage } from './chatMessage';
import { JwtService } from '@nestjs/jwt';
import { ChatController } from './chat.Controller';
import { WsJwtGuard } from './guards/auth.guard';

@Module({
  controllers:[ChatController],
  imports: [TypeOrmModule.forFeature([ChatMessage]), UsersModule],
  providers: [ChatService, ChatGateway, JwtService,WsJwtGuard],
  exports: [ChatService],
})
export class ChatModule {}
