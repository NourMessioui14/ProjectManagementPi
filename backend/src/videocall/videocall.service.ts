import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VideoCallDto } from 'src/dto/videocall.dto';
import { VideoCall, VideoCallDocument } from 'src/models/videocall.models';
import { SignUpDto } from 'src/auth/dto/signup.dto'; // Import SignUpDto for user operations

@Injectable()
export class VideocallService {

    constructor(@InjectModel(VideoCall.name) private videocallModel: Model<VideoCallDocument>) {}

    create(body: VideoCallDto) {
        return this.videocallModel.create(body);
    }

    findAll() {
        return this.videocallModel.find();
    }

    findOne(id: string) {
        return this.videocallModel.findById(id);
    }

    update(id: string, body: VideoCallDto) {
        return this.videocallModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );
    }

    delete(id: string) {
        return this.videocallModel.deleteMany({ _id: id });
    }

    
    /*
    
    async joinVideocall(videocallId: string, user: SignUpDto) {
        const videocall = await this.findOne(videocallId);
        if (!videocall) {
            throw new NotFoundException('Video call not found');
        }
        // Check if the user is already invited or joined
        const isInvited = videocall.invitedUsers.some(invitedUser => invitedUser.email === user.email);
        const hasJoined = videocall.messages.some(message => message.sender.email === user.email);
        if (!isInvited && !hasJoined) {
            throw new NotFoundException('User is not invited to this video call');
        }
        // Add the user to the list of participants if not already joined
        if (!hasJoined) {
            //videocall.messages.push({ sender: user, content: User ${user.email} joined the call. });
            await videocall.save();
        }
        return videocall;
    }




    async quitVideocall(videocallId: string, user: SignUpDto) {
        const videocall = await this.findOne(videocallId);
        if (!videocall) {
            throw new NotFoundException('Video call not found');
        }
        // Check if the user has already joined
        const hasJoined = videocall.messages.some(message => message.sender.email === user.email);
        if (!hasJoined) {
            throw new NotFoundException('User has not joined this video call');
        }
        // Remove the user from the list of participants
        //videocall.messages.push({ sender: user, content: User ${user.email} left the call. });
        await videocall.save();
        return videocall;
    }

    */
}
