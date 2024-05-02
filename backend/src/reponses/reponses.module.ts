import { Module } from '@nestjs/common';
import { ReponsesController } from './reponses.controller';
import { ReponsesService } from './reponses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reponse, ReponseSchema } from 'src/models/response.models';
import { Reclamation, ReclamationSchema } from 'src/models/reclamations.model';
import { EmailServiceReponse } from './EmailReponse.service';
import { AppGateway } from 'src/app.gateway';


@Module({
  imports : [  MongooseModule.forFeature([
    { name: Reponse.name, schema: ReponseSchema },
    { name: Reclamation.name, schema: ReclamationSchema },
  ]),
],
  controllers: [ReponsesController],
  providers: [ReponsesService,EmailServiceReponse , AppGateway]
})
export class ReponsesModule {}
