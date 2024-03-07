import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class VideoCallDto {
    @IsNotEmpty()
    videocallId: string;

    @IsNotEmpty()
    projectId: string;

    @IsNotEmpty()
    videocallCreatorId: string;

    @IsNotEmpty()
    subject: string;

    @IsDateString()
    date: string;

    @IsDateString()
    time: string;

    @IsNotEmpty()
    @IsNumber()
    estimatedDurationMinutes: number;
}
