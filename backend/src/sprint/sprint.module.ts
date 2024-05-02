import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sprint, SprintSchema } from 'src/models/sprint.models';
import { TicketModule } from 'src/ticket/ticket.module';
import { EmailSpService } from './email-sp.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sprint.name, schema: SprintSchema }]),TicketModule
],
  controllers: [SprintController],
  exports: [MongooseModule],
  providers: [SprintService, EmailSpService]
})
export class SprintModule {}
