import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket, TicketSchema } from 'src/models/ticket.models';


@Module({

  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])],
  controllers: [TicketController],
  providers: [TicketService]
  
})
export class TicketModule {}
