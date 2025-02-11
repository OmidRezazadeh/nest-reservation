import { ChatService } from './chat.service';
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { MessageDto } from './dto/MessageDto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
@Controller('chat')
export class ChatController {

constructor
(
    private readonly chatService:ChatService
){}

// @Post('send')
// @UseGuards(JwtAuthGuard)
// async sendMessage(
//     @Request() req,
//     @Body() messageDto: MessageDto
//     ) {
//         const senderId = req.user.id; // Extract sender ID from JWT
//         console.log(senderId);
//         return this.chatService.saveMessage( messageDto,senderId);
//     }
// }
}