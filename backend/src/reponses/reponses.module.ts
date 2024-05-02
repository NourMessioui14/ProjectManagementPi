import { Module } from '@nestjs/common';
import { ReponsesController } from './reponses.controller';
import { ReponsesService } from './reponses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reponse, ReponseSchema } from 'src/models/response.models';
import { Reclamation, ReclamationSchema } from 'src/models/reclamations.model';
import { EmailServiceReponse } from './EmailReponse.service';
import { AppGateway } from 'src/app.gateway';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { Notification, NotificationSchema } from 'src/models/notification.models';


@Module({
  imports : [  MongooseModule.forFeature([
    { name: Reponse.name, schema: ReponseSchema },
    { name: Reclamation.name, schema: ReclamationSchema },
    { name: Notification.name, schema: NotificationSchema }
  ]),
  
  
],
  controllers: [ReponsesController],
  providers: [ReponsesService,EmailServiceReponse , AppGateway ]
})
export class ReponsesModule {}
