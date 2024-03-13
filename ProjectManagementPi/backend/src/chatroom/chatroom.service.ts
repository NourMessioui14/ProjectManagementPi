import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatroomDto } from 'src/dto/chaatroom.dto'; // Correct the typo in the import path
import { Chatroom, ChatroomDocument } from 'src/models/chatroom.models';
import { format } from 'date-fns';

@Injectable()
export class ChatroomService {

    constructor(@InjectModel(Chatroom.name) private chatroomModel: Model<ChatroomDocument>) {}

    async create(body: ChatroomDto) {
        const createdChatroom = await this.chatroomModel.create(body);

        // Format the creationDate before sending the response
        //const formattedChatroom = createdChatroom.toObject();
        //formattedChatroom.creationDate = format(createdChatroom.creationDate, 'dd/MM/yyyy');

        return createdChatroom;
    }

    findAll() {
        return this.chatroomModel.find();
    }

    findOne(id: string) {
        return this.chatroomModel.findOne({ _id: id });
    }

    update(id: string, body: ChatroomDto) {
        return this.chatroomModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true }
        );
    }

    delete(id: string) {
        return this.chatroomModel.deleteMany({ _id: id });
    }
}
