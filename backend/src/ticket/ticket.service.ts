import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketDto } from 'src/dto/ticket.dto';
import { Ticket, TicketDocument } from 'src/models/ticket.models';

@Injectable()
export class TicketService {

    constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}

    AddTicket(body: TicketDto){
        return this.ticketModel.create(body);
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

    //  async findTicketsByProjectName(projectName: string): Promise<TicketDocument[]> {
    //     try {
    //         const tickets = await this.ticketModel.find({ 'project.projectname': projectName });
    //         return tickets;
    //     } catch (error) {
    //         console.error('Error fetching tickets by project name:', error);
    //         throw error;
    //     }
    // }

    GetTicketsByProjectId(projectId: string) {
        return this.ticketModel.find({ 'project._id': projectId });
      }
    
}
