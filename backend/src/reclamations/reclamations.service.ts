import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ReclamationDto } from 'src/dto/reclamations.dto';
import { Reclamation, ReclamationDocument } from 'src/models/reclamations.model';

@Injectable()
export class ReclamationsService {

    constructor(@InjectModel(Reclamation.name) private RecamationModel: Model<ReclamationDocument>) {}

     async Add(body: ReclamationDto): Promise<Reclamation> {
         const createdReclamation = new this.RecamationModel(body);
         return createdReclamation.save();
    }

    // Add(body: ReclamationDto) {
    //     return this.RecamationModel.create(body);
    //   }
 
    FinAll(){
        return this.RecamationModel.find();
    }


    FindById(id : string){
        return this.RecamationModel.findOne({ _id: id});
    }


    Update(id: string, body: ReclamationDto){
        return this.RecamationModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true },
        );
    }


    Delete(id: string){
        return this.RecamationModel.deleteOne({ _id: id });
    }


    Search(){
        return 'search claim'
    }

}
