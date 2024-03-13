import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.models'; // Adjust the import based on your actual file structure

export type VideoCallDocument = VideoCall & Document;

@Schema()
export class VideoCall {
    @Prop({ required: true })
    videocallId: string;

    @Prop({ required: true })
    projectId: string;

    @Prop({ required: true })
    videocallCreatorId: string;

    @Prop({ required: true })
    subject: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    invitedUsers: User[]; // Array of users invited to the video call

    // @Prop({ required: true })
    // date: Date;

    // @Prop({ required: true })
    // time: Date;

    @Prop({ required: true })
    estimatedDurationMinutes: number;
}

export const VideoCallSchema = SchemaFactory.createForClass(VideoCall);
