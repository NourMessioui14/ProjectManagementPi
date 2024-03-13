import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service'; // Assurez-vous d'importer votre MessageService
import { MessageDto } from 'src/dto/message.dto'; // Assurez-vous d'importer votre MessageDto

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
    findOneMessage(@Param() { id }) {
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
}

