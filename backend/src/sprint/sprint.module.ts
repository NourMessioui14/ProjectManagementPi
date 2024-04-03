import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sprint, SprintSchema } from 'src/models/sprint.models';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
<<<<<<< HEAD
  imports: [MongooseModule.forFeature([{ name: Sprint.name, schema: SprintSchema }]),
  TicketModule
=======
  imports: [MongooseModule.forFeature([{ name: Sprint.name, schema: SprintSchema }])
, TicketModule
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
],
  controllers: [SprintController],
  providers: [SprintService]
})
export class SprintModule {}
