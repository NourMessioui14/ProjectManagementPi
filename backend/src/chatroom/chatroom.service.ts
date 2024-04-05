import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { ChatroomDto } from 'src/dto/chaatroom.dto'; // Correct the typo in the import path
import { Chatroom, ChatroomDocument } from 'src/models/chatroom.models';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ChatroomService {

    constructor(@InjectModel(Chatroom.name) private chatroomModel: Model<ChatroomDocument>) {}

    async create(body: ChatroomDto) {
        const createdChatroom = await this.chatroomModel.create(body);
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

    
    
    
    
    async getChatroomsByUserId(userId: string): Promise<Chatroom[]> {
        return this.chatroomModel.find({ 'members': userId }).exec();
    }

    
    
    
    
    async addMember(chatroomId: string, userId: string): Promise<{ chatroom: Chatroom, message: string }> {
        const chatroom = await this.chatroomModel.findById(chatroomId);
        if (!chatroom) {
            throw new NotFoundException('Chatroom not found');
        }

        const userExists = chatroom.members.includes(userId);
        if (userExists) {
            throw new Error('User is already a member of the chatroom');
        }

        chatroom.members.push(userId);
        await chatroom.save();
        const message = `User ${userId} has joined the chatroom`;
        return { chatroom, message };
    }

    async removeMember(chatroomId: string, userId: string): Promise<{ chatroom: Chatroom, message: string }> {
        const chatroom = await this.chatroomModel.findById(chatroomId);
        if (!chatroom) {
            throw new NotFoundException('Chatroom not found');
        }

        const memberIndex = chatroom.members.findIndex(member => member === userId);
        if (memberIndex === -1) {
            throw new NotFoundException('User is not a member of the chatroom');
        }

        chatroom.members.splice(memberIndex, 1);
        await chatroom.save();
        const message = `User ${userId} has quit the chatroom`;
        return { chatroom, message };
    }

    getUserIdFromToken(token: string): {userId : string} | null {
        try {
          const decodedToken = jwt.decode(token) as { id: string };
          if (decodedToken && decodedToken.id) {
            return { userId: decodedToken.id};
          }
          return null;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
}
