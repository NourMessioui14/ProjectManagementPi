import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModule } from './ticket/ticket.module';
import { ReclamationsModule } from './reclamations/reclamations.module';
import { ReponsesModule } from './reponses/reponses.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI), // Use process.env.MONGO_URI to access the environment variable
    ProjectModule, TicketModule, ReclamationsModule, ReponsesModule
  ],
})
export class AppModule {}
