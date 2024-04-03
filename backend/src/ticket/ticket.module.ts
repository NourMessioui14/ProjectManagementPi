import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket, TicketSchema } from 'src/models/ticket.models';
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { EmailService } from './Email.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from 'src/project/project.module';
import { ProjectService } from 'src/project/project.service';
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7


@Module({

<<<<<<< HEAD
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])],
  controllers: [TicketController],
  providers: [TicketService]
=======
<<<<<<< HEAD
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService, MongooseModule] 

=======
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),AuthModule,ProjectModule],
  controllers: [TicketController],
  providers: [TicketService,EmailService,ProjectService],
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  
})
export class TicketModule {}
