/*import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatroomModule } from './chatroom/chatroom.module';
import { VideocallModule } from './videocall/videocall.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.MONGO_URI )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} */
 

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatroomModule } from './chatroom/chatroom.module';
import { VideocallModule } from './videocall/videocall.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    MongooseModule.forRoot(process.env.DB_URI),
    ChatroomModule,
    VideocallModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('DB_URI:', process.env.DB_URI);
  }
} 
