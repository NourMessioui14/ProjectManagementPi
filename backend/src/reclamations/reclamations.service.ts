import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

import { ReclamationDto } from 'src/dto/reclamations.dto';
import { Reclamation, ReclamationDocument, ReclamationStatus } from 'src/models/reclamations.model';

@Injectable()
export class ReclamationsService {

    constructor(@InjectModel(Reclamation.name) private RecamationModel: Model<ReclamationDocument>
    , @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}



    async updateStatus(id: string, newStatus: ReclamationStatus): Promise<ReclamationDocument | null> {
      const reclamation = await this.RecamationModel.findById(id);
      if (!reclamation) {
        throw new NotFoundException(`Reclamation with ID ${id} not found`);
      }
  
      if (
        newStatus === ReclamationStatus.PENDING ||
        newStatus === ReclamationStatus.IN_PROGRESS ||
        newStatus === ReclamationStatus.RESOLVED
      ) {
        reclamation.Status = newStatus;
        await reclamation.save();
        return reclamation;
      } else {
        throw new BadRequestException(`Invalid status: ${newStatus}`);
      }
    }
  
    

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

    private async isReclamationPending(id: string): Promise<boolean> {
        const reclamation = await this.RecamationModel.findById(id);
        return reclamation && reclamation.Status === ReclamationStatus.PENDING;
      }

      async Update(id: string, body: ReclamationDto): Promise<ReclamationDocument | null> {
        const isPending = await this.isReclamationPending(id);
        if (!isPending) {
          throw new Error('Cannot update Reclamation. Status is not Pending.');
        }
        return this.RecamationModel.findByIdAndUpdate({ _id: id }, { $set: body }, { new: true });
      }
      async Delete(id: string): Promise<void> {
        const isPending = await this.isReclamationPending(id);
        if (!isPending) {
          throw new Error('Cannot delete Reclamation. Status is not Pending.');
        }
        await this.RecamationModel.deleteOne({ _id: id });
      }


    // Update(id: string, body: ReclamationDto){
    //     return this.RecamationModel.findByIdAndUpdate(
    //         { _id: id },
    //         { $set: body },
    //         { new: true },
    //     );
    // }

    // Delete(id: string){
    //     return this.RecamationModel.deleteOne({ _id: id });
    // }



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

    async updateAllToPending(): Promise<Reclamation[]> {
      const reclamations = await this.RecamationModel.find();
      const updatedReclamations = [];

      for (const reclamation of reclamations) {
          if (reclamation.Status !== ReclamationStatus.PENDING) {
              reclamation.Status = ReclamationStatus.PENDING;
              await reclamation.save();
              updatedReclamations.push(reclamation);
          }
      }

      return updatedReclamations;
  }


    





}