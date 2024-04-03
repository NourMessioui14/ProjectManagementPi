import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SprintDto } from 'src/dto/sprint.dto';
import { Sprint, SprintDocument } from 'src/models/sprint.models';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { TicketService } from 'src/ticket/ticket.service';
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

@Injectable()
export class SprintService {

    constructor(
<<<<<<< HEAD
=======
<<<<<<< HEAD
        @InjectModel(Sprint.name) private readonly sprintModel: Model<SprintDocument>,
        private readonly ticketService: TicketService) {}
=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
        @InjectModel(Sprint.name) private sprintModel: Model<SprintDocument>) {}


    //  async Add(body: SprintDto) {
    //     // Récupérez les tickets à partir des identifiants fournis
    //      const tickets = await this.ticketModel.find({ _id: { $in: body.tickets } });

    //      // Ajoutez les tickets associés au sprint
    //      const sprint = await this.sprintModel.create({ ...body, tickets });
        
    //      // Retournez le sprint créé
    //      return sprint;
    //  }

<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
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

=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
}
