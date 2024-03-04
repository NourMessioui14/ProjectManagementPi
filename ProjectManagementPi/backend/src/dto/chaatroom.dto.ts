import { IsDateString, IsNotEmpty } from "class-validator";

export class ChatroomDto {
    @IsNotEmpty()
    chatroomname: string;

    @IsNotEmpty()
    creator: string; // Assuming this is the creator of the chatroom

    @IsDateString()
    createdAt: string; // Format "YYYY-MM-DD", assuming you want to provide the creation date during DTO input

    @IsNotEmpty()
    description: string;
}
