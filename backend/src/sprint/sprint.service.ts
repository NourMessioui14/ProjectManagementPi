import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SprintDto } from 'src/dto/sprint.dto';
import { Sprint, SprintDocument } from 'src/models/sprint.models';
import { TicketService } from 'src/ticket/ticket.service';

@Injectable()
export class SprintService {

    constructor(
        @InjectModel(Sprint.name) private readonly sprintModel: Model<SprintDocument>,
        private readonly ticketService: TicketService) {}
    
     Add(body: SprintDto){
         return this.sprintModel.create(body);
     }

    FindAllsprint(){
        return this.sprintModel.find();
    }
    FindOnesprint(id : string){
        return this.sprintModel.findOne({_id:id});
    }
    
     Updatesprint(id:string,body:SprintDto){
        return this.sprintModel.findByIdAndUpdate({_id:id},{$set:body},{new:true},
            );
     }
     Deletesprint(id){
        return this.sprintModel.deleteMany({_id:id});
     }

    //  async assignTicketsToSprint(sprintId: string, ticketIds: string[]): Promise<Sprint> {
    //     const sprint = await this.FindOnesprint(sprintId);
    //     if (!sprint) {
    //         throw new Error('Sprint not found');
    //     }

    //     // Récupérer les tickets à partir des IDs fournis
    //     const tickets = await Promise.all(ticketIds.map(ticketId => this.ticketService.FindOneticket(ticketId)));
        
    //     // Assigner les tickets au sprint
    //     sprint.tickets = tickets;
        
    //     // Enregistrer les modifications dans la base de données
    //     return sprint.save();
    // }

}
