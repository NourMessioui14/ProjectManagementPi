import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< Updated upstream

@Module({
  imports: [],
=======
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ProjectModule } from './project/project.module';
import { TicketModule } from './ticket/ticket.module';
import { SprintModule } from './sprint/sprint.module';
import { ReclamationsModule } from './reclamations/reclamations.module';
import { ReponsesModule } from './reponses/reponses.module';
import { MessageModule } from './message/message.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { VideocallModule } from './videocall/videocall.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    ProjectModule,TicketModule,SprintModule,ReclamationsModule,ReponsesModule,MessageModule,ChatroomModule,VideocallModule
  ],
>>>>>>> Stashed changes
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
