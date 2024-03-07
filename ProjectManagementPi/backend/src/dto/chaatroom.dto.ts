import { IsDateString, IsNotEmpty } from "class-validator";

export class ChatroomDto {
    @IsNotEmpty()
    chatroomId: string;

    @IsNotEmpty()
    projectId: string;

    @IsNotEmpty()
    chatroomCreatorId: string;

    @IsNotEmpty()
    chatroomName: string;

    @IsDateString()
    creationDate: string;
}
