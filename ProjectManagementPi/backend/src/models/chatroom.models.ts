import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ChatroomDocument = Chatroom & Document;

@Schema()
export class Chatroom {
    @Prop({ required: true })
    chatroomId: string;

    @Prop({ required: true })
    projectId: string;

    @Prop({ required: true })
    chatroomCreatorId: string;

    @Prop({ required: true })
    chatroomName: string;

    @Prop({ required: true })
    creationDate: Date;
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
