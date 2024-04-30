import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SprintDto } from 'src/dto/sprint.dto';
import { Sprint, SprintDocument } from 'src/models/sprint.models';
import { TicketService } from 'src/ticket/ticket.service';

@Injectable()
export class SprintService {
z
    constructor(
        @InjectModel(Sprint.name) private readonly sprintModel: Model<SprintDocument>,
        private ticketService: TicketService) {}
    
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


     async findAllSprintsByProjectId(projectId: string): Promise<Sprint[]> {
        console.log(`Searching for sprints with project ID: ${projectId}`);
        const sprints = await this.sprintModel.find({ 'project._id': projectId }).exec();
        console.log(`Found sprints: ${JSON.stringify(sprints)}`);
        return sprints;
    }


}
