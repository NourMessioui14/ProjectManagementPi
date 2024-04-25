import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TicketDto } from 'src/dto/ticket.dto';
import { Ticket, TicketDocument } from 'src/models/ticket.models';
import { EmailService } from './Email.service';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { Project, ProjectDocument } from 'src/models/project.models';
import { Sprint, SprintDocument } from 'src/models/sprint.models';

@Injectable()
export class TicketService {

    constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
        @InjectModel(Sprint.name) private sprintModel: Model<SprintDocument>,

    

    private emailService: EmailService
    ) {}
    
    async AddTicket(body: TicketDto) {
        const newTicket = await this.ticketModel.create(body);
    
        // Supposons que vous vavez l'ID du responsable en tant que partie de body
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

    async createTicketFromDescription(description: string): Promise<Ticket> {
        const keywords = {
            project: 'project',
            sprint: 'sprint',
            typeOfticket: 'typeOfticket',
            etat: 'etat',
            description: 'description',
            responsable: 'responsable'
        };
    
        const ticketData: Partial<TicketDto> = {};
        Object.entries(keywords).forEach(([key, modelKey]) => {
            const regex = new RegExp(`${key}:\\s*([^,]+?)(?=\\s*(?:${Object.keys(keywords).join('|')}|$))`, 'i');
            const match = description.match(regex);
            if (match && match[1]) {
                ticketData[modelKey] = match[1].trim();
            }
        });
    
        console.log('Ticket data:', ticketData); // Log ticket data
    
        if (!ticketData.project || !ticketData.typeOfticket ||  !ticketData.etat || !ticketData.description || !ticketData.responsable) {
            console.error('Missing required ticket fields:', ticketData);
            throw new NotFoundException('Missing required ticket fields.');
        }
    
        console.log('Ticket data after validation:', ticketData); // Log ticket data after validation
    
const project = await this.projectModel.findById(ticketData.project).exec();             if (!project) {
            console.log("Project search error:", `Project with ID '${ticketData.project}' not found.`);
            throw new NotFoundException(`Project with ID '${ticketData.project}' not found.`);
        }
        console.log('Project:', project); // Log project
    
        const sprint = await this.sprintModel.findOne({ sprintname: { $regex: new RegExp(ticketData.sprint, 'i') } }).exec();
        if (!sprint) {
            console.log("Sprint search error:", `Sprint with name '${ticketData.sprint}' not found.`);
            throw new NotFoundException(`Sprint with name '${ticketData.sprint}' not found.`);
        }
    
        console.log('Sprint:', sprint); // Log sprint
    
        const user = await this.userModel.findOne({ name: { $regex: new RegExp(ticketData.responsable, 'i') } }).exec();
        if (!user) {
            console.log("User search error:", `User with name '${ticketData.responsable}' not found.`);
            throw new NotFoundException(`User with name '${ticketData.responsable}' not found.`);
        }
    
        console.log('User:', user); // Log user
    
        const newTicket = await this.ticketModel.create(ticketData as TicketDto);
        console.log("Ticket created successfully!", newTicket);
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
