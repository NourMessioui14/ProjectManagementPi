import { Injectable,Logger  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SprintDto } from 'src/dto/sprint.dto';
import { Sprint, SprintDocument } from 'src/models/sprint.models';
import { TicketService } from 'src/ticket/ticket.service';
import { UserDocument } from 'src/auth/schemas/user.schema';
import { EmailSpService } from './email-sp.service';

@Injectable()
export class SprintService {

    private readonly logger = new Logger(SprintService.name);

    constructor(
        @InjectModel(Sprint.name) private readonly sprintModel: Model<SprintDocument>,
        private ticketService: TicketService, 
        private emailService: EmailSpService

    ) {}
    
     Add(body: SprintDto){
         return this.sprintModel.create(body);
     }

    FindAllsprint(){
        return this.sprintModel.find();
    }
    FindOnesprint(id : string){
        return this.sprintModel.findOne({_id:id});
    }


    // async AddTicket(body: TicketDto) {
    //     const newTicket = await this.ticketModel.create(body);
    
    //     // Supposons que vous vavez l'ID du responsable en tant que partie de body
    //     // ou que vous le déterminez d'une autre manière
    //     const responsableId = body.responsable;
    
    //     // Recherche de l'utilisateur responsable par son ID pour obtenir son email
    //     const responsable = await this.userModel.findById(responsableId).exec();
    //     if (responsable && responsable.email) {
    //         await this.emailService.sendEmail(
    //             responsable.email,
    //             "Nouveau Ticket Assigné",
    //             `Vous avez été assigné à un nouveau ticket : ${newTicket.description}`
    //         );
    //     }
    
    //     return newTicket;
    // }

    async Updatesprint(id: string, body: SprintDto): Promise<any> {
        const updatedSprint = await this.sprintModel.findByIdAndUpdate(id, { $set: body }, { new: true });
        const assignedTickets = await this.ticketService.findAllTicketsBySprintId(id);
        // Récupérez les adresses e-mail des responsables de chaque ticket
        const responsibleEmails = assignedTickets
            .filter(ticket => typeof ticket.responsable !== 'undefined' && 'email' in ticket.responsable)
            .map(ticket_1 => (ticket_1.responsable as UserDocument).email);
        try {
            await this.emailService.sendEmail(
                responsibleEmails.join(','), // Adresse(s) e-mail des destinataires
                'Modification de Sprint',
                `Le sprint ${updatedSprint.sprintname} a été modifié.`
            );
            this.logger.log('Email sent successfully to ticket responsibles.');
            return updatedSprint;
        } catch (error) {
            this.logger.error(`Failed to send email: ${error}`);
            return updatedSprint;
        }
    }
    
    
    //  Updatesprint(id:string,body:SprintDto){
    //     return this.sprintModel.findByIdAndUpdate({_id:id},{$set:body},{new:true},
    //         );
    //  }
     Deletesprint(id){
        return this.sprintModel.deleteMany({_id:id});
     }


     async findAllSprintsByProjectId(projectId: string): Promise<Sprint[]> {
        console.log(`Searching for sprints with project ID: ${projectId}`);
        const sprints = await this.sprintModel.find({ 'project._id': projectId }).exec();
        console.log(`Found sprints: ${JSON.stringify(sprints)}`);
        return sprints;
    }


}
