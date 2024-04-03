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
<<<<<<< HEAD
=======
  exports: [MongooseModule], // Important pour rendre ProjectModel accessible ailleurs

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  providers: [ProjectService]
})
export class ProjectModule {}
