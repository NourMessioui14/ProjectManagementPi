import { Module } from '@nestjs/common';
import { SprintsModule } from './sprints/sprints.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SprintsSchema } from './models/sprints.models';
import { ScrumModule } from './scrum/scrum.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI),
    
    SprintsModule,
    
    ScrumModule
  ],
  
})
export class AppModule {}
