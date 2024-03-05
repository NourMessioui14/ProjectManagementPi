import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  // Ajout de l'importation pour MongooseModule
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { Chatroom, ChatroomSchema } from 'src/models/chatroom.models';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chatroom.name, schema: ChatroomSchema }])],  // Ajout de la configuration de MongooseModule
  providers: [ChatroomService],
  controllers: [ChatroomController]
})
export class ChatroomModule {}
