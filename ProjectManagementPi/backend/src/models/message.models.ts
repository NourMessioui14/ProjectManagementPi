import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.models'; // Adjust the import based on your actual file structure

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({ required: true })
    messageId: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    sender: User; // Reference to the User model

    @Prop({ required: true })
    chatroomId: string;

    @Prop({ required: true })
    dateId: string;

    @Prop({ required: true })
    messageText: string;

    // If you want to keep timeId property
    // @Prop({ required: true })
    // timeId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
