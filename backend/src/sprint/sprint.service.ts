import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SprintDto } from 'src/dto/sprint.dto';
import { Sprint, SprintDocument } from 'src/models/sprint.models';
import { TicketService } from 'src/ticket/ticket.service';
import { EmailSpService } from './email-sp.service';

@Injectable()
export class SprintService {

    private readonly logger = new Logger(SprintService.name);


    constructor(
        @InjectModel(Sprint.name) private readonly sprintModel: Model<SprintDocument>,
        private ticketService: TicketService, 
        private emailService: EmailSpService
    ) {}
    
    async Add(body: SprintDto) {
        return this.sprintModel.create(body);
    }

    async FindAllsprint() {
        return this.sprintModel.find().exec();
    }

    async FindOnesprint(id: string) {
        return this.sprintModel.findById(id).exec();
    }

    async Updatesprint(id: string, body: SprintDto): Promise<SprintDocument | null> {
        const updatedSprint = await this.sprintModel.findByIdAndUpdate(id, { $set: body }, { new: true }).exec();
        const assignedTickets = await this.ticketService.findAllTicketsBySprintId(id);
        // Récupérez les adresses e-mail des responsables de chaque ticket
        const responsibleEmails = assignedTickets
            .filter(ticket => ticket.responsable && ticket.responsable)
            .map(ticket => ticket.responsable);
        try {
            await this.emailService.sendEmail(
                responsibleEmails.join(','), // Adresse(s) e-mail des destinataires
                'Modification de Sprint',
                `Le sprint ${updatedSprint.sprintname} a été modifié.`
            );
            this.logger.log('Email sent successfully to ticket responsibles.');
        } catch (error) {
            this.logger.error(`Failed to send email: ${error}`);
        }
        return updatedSprint;
    }
    
    async Deletesprint(id: string) {
        return this.sprintModel.deleteMany({ _id: id }).exec();
    }

    async findAllSprintsByProjectId(projectId: string): Promise<Sprint[]> {
        this.logger.log(`Searching for sprints with project ID: ${projectId}`);
        const sprints = await this.sprintModel.find({ 'project._id': projectId }).exec();
        this.logger.log(`Found sprints: ${JSON.stringify(sprints)}`);
        return sprints;
    }
}
