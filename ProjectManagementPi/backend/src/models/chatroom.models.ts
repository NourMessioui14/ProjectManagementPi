import { Prop, Schema ,  SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ChatroomDocument = Chatroom & Document;

@Schema()
export class Chatroom {
    @Prop({ required: true })
    chatroomname: string;

    @Prop({ required: true })
    creator: string; // Assuming this is the creator of the chatroom

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    createdAt: Date; // Assuming you want to track the creation date of the chatroom
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
