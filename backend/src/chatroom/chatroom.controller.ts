import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ChatroomService } from './chatroom.service'; 
import { ChatroomDto } from 'src/dto/chaatroom.dto';
import { SignUpDto } from 'src/auth/dto/signup.dto'; // Import SignUpDto

@Controller('chatrooms')
export class ChatroomController {

    constructor(private readonly service: ChatroomService) {}

    @Post()
    createChatroom(@Body() body: ChatroomDto) {
        return this.service.create(body);
    }

    @Get()
    findAllChatrooms() {
        return this.service.findAll();
    }

    @Get('/:id')
    findOneChatroom(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put('/:id')
    updateChatroom(@Param('id') id: string, @Body() body: ChatroomDto) {
        return this.service.update(id, body);
    }

    @Delete('/:id')
    deleteChatroom(@Param('id') id: string) {
        return this.service.delete(id);
    }

    @Get('user/:userId')
    getChatroomsByUserId(@Param('userId') userId: string) {
        return this.service.getChatroomsByUserId(userId);
    }

    @Put('/:chatroomId/addMember/:userId')
    async addMember(@Param('chatroomId') chatroomId: string, @Param('userId') userId: string) {
        return this.service.addMember(chatroomId, userId);
}


    @Put('/:chatroomId/removeMember/:userId')
    async removeMember(@Param('chatroomId') chatroomId: string, @Param('userId') userId: string) {
        return this.service.removeMember(chatroomId, userId);
    }

    @Get('user-id-from-token/:token') // Nouvelle route pour obtenir l'ID de l'utilisateur à partir du token JWT dans le path
    getUserIdFromToken(@Param('token') token: string) {
        return this.service.getUserIdFromToken(token);
    }
}
