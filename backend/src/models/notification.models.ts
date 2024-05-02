import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
    @Prop({ required: true })
    senderName: string;


    @Prop({ required: true })
    receiverName: string;

    @Prop({ required: true })
    description: string; // Description de la réclamation
  
   


    @Prop({  default: false })
    read: Boolean;

   
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
