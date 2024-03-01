import { Module } from '@nestjs/common';
import { SprintsController } from './sprints.controller';
import { SprintsService } from './sprints.service';
import { SprintsSchema } from 'src/models/sprints.models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name:'sprints',schema: SprintsSchema}])],
  controllers: [SprintsController],
  providers: [SprintsService]
})
export class SprintsModule {}
