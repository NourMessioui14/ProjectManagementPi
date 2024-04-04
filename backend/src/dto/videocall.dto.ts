import { IsNotEmpty, IsNumber, IsString, ArrayNotEmpty, IsArray, ValidateNested } from "class-validator";
import { SignUpDto } from "src/auth/dto/signup.dto"; // Assuming SignUpDto represents the user entity
import { Type } from "class-transformer";
import { MessageDto } from "./message.dto"; // Assuming MessageDto represents the message entity

export class VideoCallDto {
    @IsNotEmpty()
    videocallId: string;

    @IsNotEmpty()
    projectId: string;

    @IsNotEmpty()
    videocallCreator: string;

    @IsNotEmpty()
    subject: string;

    @IsNotEmpty()
    @IsNumber()
    estimatedDurationMinutes: number;

    @IsNotEmpty()
    @IsArray()
    invitedUsers: string[];

    
    @IsNotEmpty()
    @IsString()
    date: string;

    
    @IsNotEmpty()
    @IsString()
    time: string;

  
}
