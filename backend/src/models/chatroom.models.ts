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
    chatroomCreator: string; // Change the type to string

    @Prop({ required: true })
    chatroomName: string;

    @Prop({ type: [String] }) // Change the type to String[]
    members: string[]; // Array of user IDs who are part of the chatroom
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);