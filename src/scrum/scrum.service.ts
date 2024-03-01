import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scrum, ScrumDocument } from 'src/models/scrum.models';

@Injectable()
export class ScrumService {
    constructor(
        @InjectModel('scrum') private readonly scrumModel : Model<ScrumDocument>
      ) {}

    //creating scrum
  async createScrum (scrum: Scrum): Promise<Scrum>{
    const newScrum = new this.scrumModel(scrum)
    return newScrum.save()
  } 

  //reading scrum
  async readScrum(){
    return this.scrumModel.find({})
    .then((scrum)=>{return scrum})
    .catch((err)=>console.log(err))
  }

// get scrum by ID
async getScrumById(scrumId: string): Promise<Scrum> {
  try {
      const scrum = await this.scrumModel.findById(scrumId).exec();

      if (!scrum) {
          throw new NotFoundException('Scrum not found');
      }

      return scrum;
  } catch (err) {
      console.log('Error fetching scrum by ID:', err);
      throw err;
  }
}

//update scrum
async updateScrum(scrumId: string, updatedScrum: Scrum): Promise<Scrum> {
  try {
      const existingScrum = await this.scrumModel.findByIdAndUpdate(
          scrumId,
          updatedScrum,
          { new: true } // Retourne le document mis à jour
      ).exec();

      if (!existingScrum) {
          throw new Error('Scrum not found');
      }

      return existingScrum;
  } catch (err) {
      console.log('Error updating scrum:', err);
      throw err;
  }
}
  

  //delete scrum
  async deleteScrum(id){
    return this.scrumModel.findByIdAndDelete(id)
  }
}
