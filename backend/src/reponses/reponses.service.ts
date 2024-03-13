import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReponseDto } from 'src/dto/reponse.dto';
import { Reclamation, ReclamationDocument } from 'src/models/reclamations.model';
import { Reponse, ReponseDocument } from 'src/models/response.models';

@Injectable()
export class ReponsesService {


    //constructor(@InjectModel(Reponse.name) private ReponseModel: Model<ReponseDocument>) {}


    constructor(
        @InjectModel(Reponse.name) private ReponseModel: Model<ReponseDocument>,
        @InjectModel(Reclamation.name) private ReclamationModel: Model<ReclamationDocument>,
      ) {}

   

    Add(body: ReponseDto) {
        return this.ReponseModel.create(body);
      }
 
    FinAll(){
        return this.ReponseModel.find();
    }


    FindById(id : string){
        return this.ReponseModel.findOne({ _id: id});
    }


    Update(id: string, body: ReponseDto){
        return this.ReponseModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true },
        );
    }


    Delete(id: string){
        return this.ReponseModel.deleteOne({ _id: id });
    }


    Search(){
        return 'search claim'
    }

    
    async addReponseToReclamation(reclamationId: string, reponseDto: ReponseDto): Promise<Reponse> {
        // Récupérer la réclamation à laquelle ajouter la réponse
        const reclamation = await this.ReclamationModel.findById(reclamationId);
    
        // Vérifier si la réclamation existe
        if (!reclamation) {
            throw new NotFoundException('Réclamation non trouvée');
        }
    
        // Créer la réponse
        const createdReponse = await this.ReponseModel.create(reponseDto);
    
        // Ajouter la réponse à la réclamation
        reclamation.reponses.push(createdReponse);
        await reclamation.save();
    
        return createdReponse;
    }
    

/*
    async addReponseToReclamation(reclamationId: string, reponseDto: ReponseDto): Promise<Reponse> {
        // Récupérer la réclamation à laquelle ajouter la réponse
        const reclamation = await this.ReclamationModel.findById(reclamationId);
      
        // Vérifier si la réclamation existe
        if (!reclamation) {
          throw new NotFoundException('Réclamation non trouvée');
        }
      
        // Créer la réponse
        const createdReponse = await this.ReponseModel.create(reponseDto);
      
        // Ajouter le contenu de la réponse à la réclamation
        const reponse: Reponse = new Reponse();
        reponse.text = createdReponse.text;
        reclamation.reponses.push(reponse);
        await reclamation.save();
      
        return createdReponse;
      }*/


}

