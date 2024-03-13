import { IsNotEmpty, IsArray, IsMongoId } from "class-validator";

export class ChatroomDto {
    @IsNotEmpty()
    chatroomId: string;

    @IsNotEmpty()
    projectId: string;

    @IsNotEmpty()
    chatroomCreatorId: string;

    @IsNotEmpty()
    chatroomName: string;

    @IsArray()
    @IsMongoId({ each: true }) // Validate that each element in the array is a valid MongoDB ObjectId
    users: string[]; // Array of user IDs who are part of the chatroom
}
