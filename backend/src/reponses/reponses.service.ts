import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReponseDto } from 'src/dto/reponse.dto';
import { Reclamation, ReclamationDocument } from 'src/models/reclamations.model';
import { Reponse, ReponseDocument } from 'src/models/response.models';
import { EmailServiceReponse } from './EmailReponse.service';
import { AppGateway } from 'src/app.gateway';
import { Notification, NotificationDocument } from 'src/models/notification.models';


@Injectable()
export class ReponsesService {


    //constructor(@InjectModel(Reponse.name) private ReponseModel: Model<ReponseDocument>) {}


    constructor(
        @InjectModel(Reponse.name) private ReponseModel: Model<ReponseDocument>,
        @InjectModel(Reclamation.name) private ReclamationModel: Model<ReclamationDocument>,
        @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,

       

        

        private emailService: EmailServiceReponse,
        private  appGateway: AppGateway,
      
   

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


    async Delete(id: string) {
        // Supprimer la réponse
        const deletedResponse = await this.ReponseModel.deleteOne({ _id: id });
    
        // Mettre à jour la réclamation associée
        const reclamation = await this.ReclamationModel.findOne({ reponses: id });
        if (reclamation) {
            reclamation.reponses = reclamation.reponses.filter(responseId => responseId.toString() !== id);
            await reclamation.save();
        }
    
        return deletedResponse;
    }


    Search(){
        return 'search claim'
    }

  
    async addReponseToReclamation(reclamationId: string, reponseDto: ReponseDto): Promise<Reponse> {
        const reclamation = await this.ReclamationModel.findById(reclamationId).populate('user');
        if (!reclamation) {
          throw new NotFoundException('Réclamation non trouvée');
        }
      
        const createdReponse = await this.ReponseModel.create(reponseDto);
        reclamation.reponses.push(createdReponse);
        await reclamation.save();
      
        // Création et sauvegarde de la notification
        const notification = await this.notificationModel.create({
          senderName: 'Admin', // Le nom de l'administrateur
          receiverName: reclamation.user.name, // Le nom de l'utilisateur ayant fait la réclamation
          read: false,
          description: reclamation.Description, // La description de la réclamation
        });
      
        // Envoyer un email à l'utilisateur
        const userEmail = reclamation.user.email;
        await this.emailService.sendEmail(userEmail, 'Votre réclamation a reçu une réponse', 'Votre réclamation a reçu une réponse. Consultez le site pour plus de détails.');
      
        // Émettre un événement WebSocket pour notifier l'utilisateur
        this.appGateway.server.to(reclamation.user._id).emit('notification', 'Une nouvelle réponse a été ajoutée à votre réclamation.');
      
        return createdReponse;
      }
      



}

