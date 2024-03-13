import { IsDateString, IsNotEmpty, IsMongoId } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    messageId: string;

    @IsNotEmpty()
    chatroomId: string;

    @IsNotEmpty()
    dateId: string;

    @IsNotEmpty()
    messageText: string;

    // If you want to keep timeId property
    // @IsNotEmpty()
    // timeId: string;

    // @IsNotEmpty()
    // @IsMongoId() // Validate that senderId is a valid MongoDB ObjectId
    // senderId: string; // Assuming senderId is a User's ObjectId
}
