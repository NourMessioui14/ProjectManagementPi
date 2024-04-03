import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from 'src/models/project.models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [ProjectController],
<<<<<<< HEAD
=======
  exports: [MongooseModule], // Important pour rendre ProjectModel accessible ailleurs

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
  providers: [ProjectService]
})
export class ProjectModule {}
