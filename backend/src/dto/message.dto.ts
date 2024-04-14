import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    messageId: string;

    @IsDateString()
    dateId: string;

    @IsNotEmpty()
    messageText: string;

    @IsNotEmpty()
    @IsString() // Change validation to ensure chatroomId is a string
    chatroomId: string;

    @IsNotEmpty()
    senderId: string; // Change senderId type to string
}