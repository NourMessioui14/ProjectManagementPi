import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sprint, SprintSchema } from 'src/models/sprint.models';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sprint.name, schema: SprintSchema }])],
  controllers: [SprintController],
  providers: [SprintService]
})
export class SprintModule {}
