import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type VideoCallDocument = VideoCall & Document;

@Schema()
export class VideoCall {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    startTime: Date; // Assuming this is the start time of the video call

    @Prop({ required: true })
    estimatedDuration: number; // Assuming this is the estimated duration in minutes
}

export const VideoCallSchema = SchemaFactory.createForClass(VideoCall);
