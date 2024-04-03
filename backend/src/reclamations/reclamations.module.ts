import { Module } from '@nestjs/common';
import { ReclamationsController } from './reclamations.controller';
import { ReclamationsService } from './reclamations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamation, ReclamationSchema } from 'src/models/reclamations.model';
<<<<<<< HEAD
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports : [  MongooseModule.forFeature([{ name: Reclamation.name, schema: ReclamationSchema }
                                          ,{ name: User.name, schema: UserSchema },]),
=======

@Module({
  imports : [MongooseModule.forFeature([{ name: Reclamation.name, schema: ReclamationSchema }]),
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
],

  controllers: [ReclamationsController],
  providers: [ReclamationsService]
})
export class ReclamationsModule {}
