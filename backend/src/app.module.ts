import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // Import du module ConfigModule
import { MongooseModule } from '@nestjs/mongoose'; // Import du module MongooseModule
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TicketModule } from './ticket/ticket.module';
import { SprintModule } from './sprint/sprint.module';
import { ReclamationsModule } from './reclamations/reclamations.module';
import { ReponsesModule } from './reponses/reponses.module';
import { MessageModule } from './message/message.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { VideocallModule } from './videocall/videocall.module';
import { SignalingGateway } from './signaling/signaling.gateway';
//import { GatewayModule } from './gateway/gateway.module';
//import { LoggerMiddleware } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    ProjectModule,
    TicketModule,
    SprintModule,
    ReclamationsModule,
    ReponsesModule,
    MessageModule,
    ChatroomModule,
    VideocallModule
  ],
  controllers: [AppController],
  providers: [AppService, SignalingGateway],
})
export class AppModule {


}
