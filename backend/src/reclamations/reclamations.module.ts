import { Module } from '@nestjs/common';
import { ReclamationsController } from './reclamations.controller';
import { ReclamationsService } from './reclamations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamation, ReclamationSchema } from 'src/models/reclamations.model';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports : [  MongooseModule.forFeature([{ name: Reclamation.name, schema: ReclamationSchema }
                                          ,{ name: User.name, schema: UserSchema },]),
],

  controllers: [ReclamationsController],
  providers: [ReclamationsService]
})
export class ReclamationsModule {}
