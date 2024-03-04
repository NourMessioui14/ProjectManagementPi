import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from 'src/dto/message.dto';
import { Message, MessageDocument } from 'src/models/message.models';

@Injectable()
export class MessageService {

    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    create(body: MessageDto) {
        return this.messageModel.create(body);
    }

    findAll() {
        return this.messageModel.find();
    }

    findOne(id: string) {
        return this.messageModel.findOne({ _id: id });
    }

    update(id: string, body: MessageDto) {
        return this.messageModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true }
        );
    }

    delete(id: string) {
        return this.messageModel.deleteMany({ _id: id });
    }
}
