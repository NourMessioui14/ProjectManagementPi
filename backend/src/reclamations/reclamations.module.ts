import { Module } from '@nestjs/common';
import { ReclamationsController } from './reclamations.controller';
import { ReclamationsService } from './reclamations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamation, ReclamationSchema } from 'src/models/reclamations.model';

@Module({
  imports : [MongooseModule.forFeature([{ name: Reclamation.name, schema: ReclamationSchema }]),
],

  controllers: [ReclamationsController],
  providers: [ReclamationsService]
})
export class ReclamationsModule {}
