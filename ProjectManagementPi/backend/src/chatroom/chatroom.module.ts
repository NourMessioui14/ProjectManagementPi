import { Module } from '@nestjs/common';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';

@Module({
  providers: [ChatroomService],
  controllers: [ChatroomController]
})
export class ChatroomModule {}
