import { IsDateString, IsNotEmpty } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    sender: string;

    @IsNotEmpty()
    receiver: string;

    @IsNotEmpty()
    chatroomName: string;

    @IsDateString()
    dateSent: string;

    @IsDateString()
    timeSent: string;
}
