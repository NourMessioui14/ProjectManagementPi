<<<<<<< HEAD
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
=======
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

import { ReclamationDto } from 'src/dto/reclamations.dto';
import { Reclamation, ReclamationDocument } from 'src/models/reclamations.model';

@Injectable()
export class ReclamationsService {

<<<<<<< HEAD
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
=======
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
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    }


    Update(id: string, body: ReclamationDto){
        return this.RecamationModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true },
        );
    }

<<<<<<< HEAD
=======

>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    Delete(id: string){
        return this.RecamationModel.deleteOne({ _id: id });
    }


<<<<<<< HEAD

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
      


=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    Search(){
        return 'search claim'
    }

<<<<<<< HEAD

    





=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
}
