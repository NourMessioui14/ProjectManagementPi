import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatroomDto } from 'src/dto/chaatroom.dto';  // Veuillez corriger la faute de frappe dans le chemin d'importation
import { Chatroom, ChatroomDocument } from 'src/models/chatroom.models';

@Injectable()
export class ChatroomService {

    constructor(@InjectModel(Chatroom.name) private chatroomModel: Model<ChatroomDocument>) {}

    create(body: ChatroomDto) {
        return this.chatroomModel.create(body);
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
