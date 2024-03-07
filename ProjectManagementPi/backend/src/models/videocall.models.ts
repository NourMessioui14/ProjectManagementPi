import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

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

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    time: Date;

    @Prop({ required: true })
    estimatedDurationMinutes: number;
}

export const VideoCallSchema = SchemaFactory.createForClass(VideoCall);
