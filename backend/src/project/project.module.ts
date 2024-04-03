import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from 'src/models/project.models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [ProjectController],
  exports: [MongooseModule], // Important pour rendre ProjectModel accessible ailleurs

  providers: [ProjectService]
})
export class ProjectModule {}
