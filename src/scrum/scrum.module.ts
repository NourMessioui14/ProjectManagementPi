import { Module } from '@nestjs/common';
import { ScrumController } from './scrum.controller';
import { ScrumService } from './scrum.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrumSchema } from 'src/models/scrum.models';

@Module({
  imports: [MongooseModule.forFeature([{name:'scrum',schema: ScrumSchema}])],
  controllers: [ScrumController],
  providers: [ScrumService]
})
export class ScrumModule {}
