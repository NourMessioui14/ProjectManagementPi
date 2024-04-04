import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({ required: true })
    messageId: string;

    @Prop({ required: true })
    chatroomId: string;

    @Prop({ required: true })
    dateId: string;

    @Prop({ required: true })
    messageText: string;

    @Prop({ required: true })
    senderId: string; // Reference to the user who sent the message
}

export const MessageSchema = SchemaFactory.createForClass(Message);
