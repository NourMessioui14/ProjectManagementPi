import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VideoCallDto } from 'src/dto/videocall.dto';
import { VideoCall, VideoCallDocument } from 'src/models/videocall.models';

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
        return this.videocallModel.findOne({ _id: id });
    }

    update(id: string, body: VideoCallDto) {
        return this.videocallModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true }
        );
    }

    delete(id: string) {
        return this.videocallModel.deleteMany({ _id: id });
    }
}
