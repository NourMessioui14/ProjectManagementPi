import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDto } from 'src/dto/notification.dto';
import { Notification, NotificationDocument } from 'src/models/notification.models';


@Injectable()
export class NotificationsService {
    constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}


    Add(body: NotificationDto){
        return this.notificationModel.create(body);
    }
    
    FindAllNotifications(): Promise<Notification[]>{
        return this.notificationModel.find();
    }

    async markAllAsRead(): Promise<void> {
        await this.notificationModel.updateMany({}, { read: true }).exec();
    }

    async Update(id: string, body: NotificationDto): Promise<NotificationDocument | null> {
        return this.notificationModel.findByIdAndUpdate(id, body, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.notificationModel.findByIdAndDelete(id).exec();
    }
    

   


}
