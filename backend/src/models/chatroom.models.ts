import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
//import { User } from './user.models'; // Make sure to adjust the import based on your actual file structure

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

  //  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    // users: User[]; // Array of users who are part of the chatroom
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
