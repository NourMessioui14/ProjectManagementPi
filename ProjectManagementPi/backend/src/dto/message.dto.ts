import { IsDateString, IsNotEmpty } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    messageId: string;

    @IsNotEmpty()
    chatroomId: string;

    @IsNotEmpty()
    dateId: string;

    @IsNotEmpty()
    messageText: string;

    @IsNotEmpty()
    timeId: string;

    @IsNotEmpty()
    senderId: string;
}
