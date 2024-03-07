import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SprintDto } from 'src/dto/sprint.dto';
import { Sprint, SprintDocument } from 'src/models/sprint.models';

@Injectable()
export class SprintService {

    constructor(@InjectModel(Sprint.name) private sprintModel: Model<SprintDocument>) {}

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
