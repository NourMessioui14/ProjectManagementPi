import { IsNotEmpty, IsNumber, IsString, ArrayNotEmpty, IsArray, IsMongoId } from "class-validator";

export class VideoCallDto {
    @IsNotEmpty()
    videocallId: string;

    @IsNotEmpty()
    projectId: string;

    @IsNotEmpty()
    videocallCreatorId: string;

    @IsNotEmpty()
    subject: string;

    // You can uncomment these lines if you want to validate date and time strings
    // @IsDateString()
    // date: string;

    // @IsDateString()
    // time: string;

     @IsNotEmpty()
     @IsNumber()
    estimatedDurationMinutes: number;

    // @IsNotEmpty()
    // @IsArray()
    // @ArrayNotEmpty()
    // @IsMongoId({ each: true }) // Validate that each element in the array is a valid MongoDB ObjectId
    // invitedUsers: string[]; // Array of user IDs invited to the video call
}
