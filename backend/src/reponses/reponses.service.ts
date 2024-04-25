import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReponseDto } from 'src/dto/reponse.dto';
import { Reclamation, ReclamationDocument } from 'src/models/reclamations.model';
import { Reponse, ReponseDocument } from 'src/models/response.models';
import { EmailServiceReponse } from './EmailReponse.service';

@Injectable()
export class ReponsesService {


    //constructor(@InjectModel(Reponse.name) private ReponseModel: Model<ReponseDocument>) {}


    constructor(
        @InjectModel(Reponse.name) private ReponseModel: Model<ReponseDocument>,
        @InjectModel(Reclamation.name) private ReclamationModel: Model<ReclamationDocument>,
        

        private emailService: EmailServiceReponse

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

    
    // async addReponseToReclamation(reclamationId: string, reponseDto: ReponseDto): Promise<Reponse> {
    //     // Récupérer la réclamation à laquelle ajouter la réponse
    //     const reclamation = await this.ReclamationModel.findById(reclamationId);
    
    //     // Vérifier si la réclamation existe
    //     if (!reclamation) {
    //         throw new NotFoundException('Réclamation non trouvée');
    //     }
    
    //     // Créer la réponse
    //     const createdReponse = await this.ReponseModel.create(reponseDto);
    
    //     // Ajouter la réponse à la réclamation
    //     reclamation.reponses.push(createdReponse);
    //     await reclamation.save();

   
    
    //     return createdReponse;
    // }


    
    async addReponseToReclamation(reclamationId: string, reponseDto: ReponseDto): Promise<Reponse> {
        // Récupérer la réclamation à laquelle ajouter la réponse
        const reclamation = await this.ReclamationModel.findById(reclamationId).populate('user'); // Populer l'utilisateur associé à la réclamation
    
        // Vérifier si la réclamation existe
        if (!reclamation) {
            throw new NotFoundException('Réclamation non trouvée');
        }
    
        // Créer la réponse
        const createdReponse = await this.ReponseModel.create(reponseDto);
    
        // Ajouter la réponse à la réclamation
        reclamation.reponses.push(createdReponse);
        await reclamation.save();
    
        // Récupérer l'e-mail de l'utilisateur associé à la réclamation
        const userEmail = reclamation.user.email;
    
        // Envoi d'un e-mail à l'utilisateur
        await this.emailService.sendEmail(
            userEmail,
            'Votre réclamation a reçu une réponse',
            'Votre réclamation a reçu une réponse. Consultez le site pour plus de détails.',
        );
    
        return createdReponse;
    }
    



}

