import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/signup.dto'; // Assuming SignUpDto represents the user entity
import { MessageDto } from "src/dto/message.dto"; // Assuming MessageDto represents the message entity

export type VideoCallDocument = VideoCall & Document;

@Schema()
export class VideoCall {
    @Prop({ required: true })
    videocallId: string;

    @Prop({ required: true })
    projectId: string;

    @Prop({ required: true})
    videocallCreator: string; 

    @Prop({ required: true })
    subject: string;

    @Prop({ required: true })
    estimatedDurationMinutes: number;

    @Prop({ type: [String] })
    invitedUsers: string[]; 

    // Champ pour la date de la vidéoconférence
    @Prop({ required: true })
    date: string;

    // Champ pour l'heure de la vidéoconférence
    @Prop({ required: true })
    time: string;

   
}

export const VideoCallSchema = SchemaFactory.createForClass(VideoCall);
