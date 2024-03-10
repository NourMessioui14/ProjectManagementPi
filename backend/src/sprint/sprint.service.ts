import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SprintDto } from 'src/dto/sprint.dto';
import { Sprint, SprintDocument } from 'src/models/sprint.models';

@Injectable()
export class SprintService {

    constructor(
        @InjectModel(Sprint.name) private sprintModel: Model<SprintDocument>) {}


    //  async Add(body: SprintDto) {
    //     // Récupérez les tickets à partir des identifiants fournis
    //      const tickets = await this.ticketModel.find({ _id: { $in: body.tickets } });

    //      // Ajoutez les tickets associés au sprint
    //      const sprint = await this.sprintModel.create({ ...body, tickets });
        
    //      // Retournez le sprint créé
    //      return sprint;
    //  }

    
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

}
