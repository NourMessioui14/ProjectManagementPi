import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sprints, SprintsDocument } from 'src/models/sprints.models';

@Injectable()
export class SprintsService {

    constructor(
        @InjectModel('sprints') private readonly sprintModel : Model<SprintsDocument>
      ) {}

    //creating sprint
  async createSprint (sprint: Sprints): Promise<Sprints>{
    const newSprint = new this.sprintModel(sprint)
    return newSprint.save()
  } 

  //reading sprint
  async readSprint(){
    return this.sprintModel.find({})
    .then((sprints)=>{return sprints})
    .catch((err)=>console.log(err))
  }

// get sprint by ID
async getSprintById(sprintId: string): Promise<Sprints> {
  try {
      const sprint = await this.sprintModel.findById(sprintId).exec();

      if (!sprint) {
          throw new NotFoundException('Sprint not found');
      }

      return sprint;
  } catch (err) {
      console.log('Error fetching sprint by ID:', err);
      throw err;
  }
}

//update sprint
async updateSprint(sprintId: string, updatedSprint: Sprints): Promise<Sprints> {
  try {
      const existingSprint = await this.sprintModel.findByIdAndUpdate(
          sprintId,
          updatedSprint,
          { new: true } // Retourne le document mis à jour
      ).exec();

      if (!existingSprint) {
          throw new Error('Sprint not found');
      }

      return existingSprint;
  } catch (err) {
      console.log('Error updating sprint:', err);
      throw err;
  }
}
  

  //delete sprint
  async deleteSprint(id){
    return this.sprintModel.findByIdAndDelete(id)
  }

  Search(key:String){
    const keyword = key?
    {
      $or: [
        {name: {$regex: key, $options:'i'}},
      ],
    } : {};
    return this.sprintModel.find(keyword);
  }
}
