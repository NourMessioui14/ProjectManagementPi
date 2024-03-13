import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDto } from 'src/dto/project.dto';
import { Project, ProjectDocument } from 'src/models/project.models';

@Injectable()
export class ProjectService {

    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

    Add(body: ProjectDto){
        return this.projectModel.create(body);
    }

    FindAllproject(){
        return this.projectModel.find();
    }
    FindOneproject(id : string){
        return this.projectModel.findOne({_id:id});
    }
    
     Updateproject(id:string,body:ProjectDto){
        return this.projectModel.findByIdAndUpdate({_id:id},{$set:body},{new:true},
            );
     }
     Deleteproject(id){
        return this.projectModel.deleteMany({_id:id});
     }

}
