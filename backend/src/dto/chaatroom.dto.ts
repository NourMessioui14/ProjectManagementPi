import { IsNotEmpty, IsArray } from "class-validator";

export class ChatroomDto {
    @IsNotEmpty()
    chatroomId: string;

    @IsNotEmpty()
    projectId: string;

    @IsNotEmpty()
    chatroomCreator: string; // Change the type to string

    @IsNotEmpty()
    chatroomName: string;

    @IsArray()
    members: string[]; // Change the type to string[]
}