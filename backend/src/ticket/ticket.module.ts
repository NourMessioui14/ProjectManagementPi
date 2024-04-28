import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { Ticket, TicketSchema } from 'src/models/ticket.models';
import { EmailService } from './Email.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from 'src/project/project.module';
import { ProjectService } from 'src/project/project.service';
import { User, UserSchema } from 'src/auth/schemas/user.schema'; // Import UserModel here
import { SprintModule } from 'src/sprint/sprint.module';
import { SprintService } from 'src/sprint/sprint.service';
import { Sprint, SprintSchema } from 'src/models/sprint.models';
import { EmailSpService } from 'src/sprint/email-sp.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }
                                        ,{ name: User.name, schema: UserSchema },
                                        { name: Sprint.name, schema: SprintSchema }]),AuthModule,ProjectModule],
  controllers: [TicketController],
  providers: [TicketService,EmailService,ProjectService,SprintService,EmailSpService ],
  exports: [TicketService, MongooseModule]
})
export class TicketModule {}