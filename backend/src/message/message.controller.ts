import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from 'src/dto/message.dto';

@Controller('messages')
export class MessageController {

    constructor(private readonly service: MessageService) {}

    @Post()
    createMessage(@Body() body: MessageDto) {
        return this.service.create(body);
    }

    @Get()
    findAllMessages() {
        return this.service.findAll();
    }

    @Get('/:id')
    findOneMessage(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put('/:id')
    updateMessage(@Param('id') id: string, @Body() body: MessageDto) {
        return this.service.update(id, body);
    }

    @Delete('/:id')
    deleteMessage(@Param('id') id: string) {
        return this.service.delete(id);
    }

    @Delete('/byDate/:dateId')
    deleteMessageByDate(@Param('dateId') dateId: string) {
        return this.service.deleteByDate(dateId);
    }

    @Get('byChatroom/:chatroomId')
    getMessagesByChatroomId(@Param('chatroomId') chatroomId: string) {
        return this.service.getMessagesByChatroomId(chatroomId);
    }

    @Get('lastMessage/:chatroomId')
    getLastMessageByChatroomId(@Param('chatroomId') chatroomId: string) {
        return this.service.getLastMessageByChatroomId(chatroomId);
    }
}
