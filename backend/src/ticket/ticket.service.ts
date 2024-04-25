import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TicketDto } from 'src/dto/ticket.dto';
import { Ticket, TicketDocument } from 'src/models/ticket.models';
import { EmailService } from './Email.service';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { Project, ProjectDocument } from 'src/models/project.models';

@Injectable()
export class TicketService {

    constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>, // Ceci devrait correspondre exactement


    

    private emailService: EmailService
    ) {}
    
    async AddTicket(body: TicketDto) {
        const newTicket = await this.ticketModel.create(body);
    
        // Supposons que vous avez l'ID du responsable en tant que partie de body
        // ou que vous le déterminez d'une autre manière
        const responsableId = body.responsable;
    
        // Recherche de l'utilisateur responsable par son ID pour obtenir son email
        const responsable = await this.userModel.findById(responsableId).exec();
        if (responsable && responsable.email) {
            await this.emailService.sendEmail(
                responsable.email,
                "Nouveau Ticket Assigné",
                `Vous avez été assigné à un nouveau ticket : ${newTicket.description}`
            );
        }
    
        return newTicket;
    }

    FindAllticket(){
        return this.ticketModel.find();
    }
    FindOneticket(id : string){
        return this.ticketModel.findOne({_id:id});
    }
    
     Updateticket(id:string,body:TicketDto){
        return this.ticketModel.findByIdAndUpdate({_id:id},{$set:body},{new:true},
            );
     }
     Deleteticket(id){
        return this.ticketModel.deleteMany({_id:id});
     }

     
     async findAllTicketsByProjectId(projectId: string): Promise<Ticket[]> {
        console.log(`Searching for tickets with project ID: ${projectId}`);
        // Utilisez l'ID du projet pour filtrer les tickets
        const tickets = await this.ticketModel.find({ 'project._id': projectId }).exec();
        console.log(`Found tickets: ${JSON.stringify(tickets)}`);
    
        return tickets;
    }
    
    
    async findAllTicketsBySprintId(sprintId: string): Promise<Ticket[]> {
        console.log(`Searching for tickets with sprint ID: ${sprintId}`);
        // Utilisez l'ID du projet pour filtrer les tickets
        const tickets = await this.ticketModel.find({ 'sprint._id': sprintId }).exec();
        console.log(`Found tickets: ${JSON.stringify(tickets)}`);
    
        return tickets;
    }
  

}
