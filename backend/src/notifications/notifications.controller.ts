import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationDto } from 'src/dto/notification.dto';
import { NotificationDocument } from 'src/models/notification.models';

@Controller('notifications')
export class NotificationsController {



    constructor(private readonly service: NotificationsService) {}

    @Post()
    Addnotif(@Body() body:NotificationDto) {
        console.log("cccccccccc")
        return this.service.Add(body);
        
    }

    @Get()
    FindAllNotifications() {
        return this.service.FindAllNotifications();
    }

    @Put('mark-all-as-read')
    markAllAsRead(): Promise<void> {
        return this.service.markAllAsRead();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateNotificationDto: NotificationDto): Promise<NotificationDocument | null> {
        return this.service.Update(id, updateNotificationDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }
}
