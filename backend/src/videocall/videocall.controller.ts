import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VideocallService } from './videocall.service';
import { VideoCallDto } from 'src/dto/videocall.dto';
//import { SignUpDto } from 'src/auth/dto/signup.dto'; // Import SignUpDto

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
    findOneVideocall(@Param('id') id: string) {
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

    /*
    @Put('/:videocallId/join')
    joinVideocall(@Param('videocallId') videocallId: string, @Body() user: SignUpDto) {
        return this.service.joinVideocall(videocallId, user);
    }

    @Put('/:videocallId/quit')
    quitVideocall(@Param('videocallId') videocallId: string, @Body() user: SignUpDto) {
        return this.service.quitVideocall(videocallId, user);
    }

    */
}
