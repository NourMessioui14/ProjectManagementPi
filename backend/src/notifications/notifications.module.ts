import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { Notification, NotificationSchema } from 'src/models/notification.models';
import { AppGateway } from 'src/app.gateway';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }])
    ],
    controllers: [NotificationsController],
    providers: [NotificationsService , AppGateway],
})
export class NotificationsModule {}
