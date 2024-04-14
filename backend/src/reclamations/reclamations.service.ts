import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

import { ReclamationDto } from 'src/dto/reclamations.dto';
import { Reclamation, ReclamationDocument } from 'src/models/reclamations.model';

@Injectable()
export class ReclamationsService {

    constructor(@InjectModel(Reclamation.name) private RecamationModel: Model<ReclamationDocument>
    , @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}



    async create(reclamationDto: ReclamationDto, user: User): Promise<Reclamation> {
        const reclamation = new this.RecamationModel({ ...reclamationDto, user: user });
        return reclamation.save();
    }



    async findByUserId(userId: string): Promise<Reclamation[]> {
        return this.RecamationModel.find({ user: userId }).exec();
    }



    async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
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



////////////////


     async Add(body: ReclamationDto): Promise<Reclamation> {
         const createdReclamation = new this.RecamationModel(body);
         return createdReclamation.save();
    }

    // Add(body: ReclamationDto) {
    //     return this.RecamationModel.create(body);
    //   }
 


      async findAllWithUser(): Promise<Reclamation[]> {
        return this.RecamationModel.find().populate('user').exec();
    }
    // FinAll(){
    //     return this.RecamationModel.find();
    // }


    FindById(id : string){
        return this.RecamationModel.findOne({ _id: id});
    }


    


    async delete11(id: string): Promise<void> {
        const reclamation = await this.RecamationModel.findByIdAndDelete(id);
        if (!reclamation) {
          throw new NotFoundException(`Reclamation with ID ${id} not found`);
        }
      }
      


    Search(){
        return 'search claim'
    }


    





}
