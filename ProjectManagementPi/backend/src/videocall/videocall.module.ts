import { Module } from '@nestjs/common';
import { VideocallController } from './videocall.controller';
import { VideocallService } from './videocall.service';
import { VideoCall, VideoCallSchema } from 'src/models/videocall.models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: VideoCall.name, schema: VideoCallSchema }])],
  providers: [VideocallService],
  controllers: [VideocallController],
})
export class VideocallModule {}
