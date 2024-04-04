import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from 'src/dto/message.dto';
import { Message, MessageDocument } from 'src/models/message.models';
//import { Server } from 'socket.io'; // Import Server from socket.io

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        //private readonly server: Server // Inject the WebSocket server
    ) {}

    async create(body: MessageDto) {
        const createdMessage = await this.messageModel.create(body);
        // Emit the created message to all WebSocket clients
        //this.server.emit('message', createdMessage);
        return createdMessage;
    }

    findAll() {
        return this.messageModel.find();
    }

    findOne(id: string) {
        return this.messageModel.findById(id);
    }

    async update(id: string, body: MessageDto) {
        const updatedMessage = await this.messageModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );
        if (!updatedMessage) {
            throw new NotFoundException('Message not found');
        }
        return updatedMessage;
    }

    async delete(id: string) {
        const deletedMessage = await this.messageModel.findByIdAndDelete(id);
        if (!deletedMessage) {
            throw new NotFoundException('Message not found');
        }
        return deletedMessage;
    }

    async deleteByDate(dateId: string) {
        const deletedMessage = await this.messageModel.findOneAndDelete({ dateId: dateId });
        if (!deletedMessage) {
            throw new NotFoundException('Message not found');
        }
        return deletedMessage;
    }
    

    getMessagesByChatroomId(chatroomId: string) {
        return this.messageModel.find({ chatroomId: chatroomId });
    }

    async getLastMessageByChatroomId(chatroomId: string): Promise<Message | null> {
        const messages = await this.messageModel
            .find({ chatroomId: chatroomId })
            .sort({ dateId: -1 })
            .limit(1)
            .exec();

        if (messages.length > 0) {
            return messages[0];
        } else {
            return null;
        }
    }
}
