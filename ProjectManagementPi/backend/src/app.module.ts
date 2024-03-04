import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatroomModule } from './chatroom/chatroom.module';
import { VideocallModule } from './videocall/videocall.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.MONGO_URI),
  ChatroomModule, VideocallModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
