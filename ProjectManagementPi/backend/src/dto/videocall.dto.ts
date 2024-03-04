import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class VideoCallDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsDateString()
    date: string;

    @IsDateString()
    startTime: string;

    @IsNumber()
    estimatedDuration: number;
}
