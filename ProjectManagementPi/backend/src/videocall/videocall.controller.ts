import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VideocallService } from './videocall.service'; // Assurez-vous d'importer votre VideoCallService
import { VideoCallDto } from 'src/dto/videocall.dto'; // Assurez-vous d'importer votre VideoCallDto

@Controller('videocalls')
export class VideocallController {

    constructor(private readonly service: VideocallService) {}

    @Post()
    createVideocall(@Body() body: VideoCallDto) {
        return this.service.create(body);
    }

    @Get()
    findAllVideocalls() {
        return this.service.findAll();
    }

    @Get('/:id')
    findOneVideocall(@Param() { id }) {
        return this.service.findOne(id);
    }

    @Put('/:id')
    updateVideocall(@Param('id') id: string, @Body() body: VideoCallDto) {
        return this.service.update(id, body);
    }

    @Delete('/:id')
    deleteVideocall(@Param('id') id: string) {
        return this.service.delete(id);
    }
}

