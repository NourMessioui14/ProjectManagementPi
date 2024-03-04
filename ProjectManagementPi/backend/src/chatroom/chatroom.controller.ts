import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ChatroomService } from './chatroom.service'; // Import your ChatroomService
import { ChatroomDto } from 'src/dto/chaatroom.dto'; // Import your ChatroomDto

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
    findOneChatroom(@Param() { id }) {
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
}
