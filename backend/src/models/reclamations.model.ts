<<<<<<< HEAD
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Reponse } from './response.models';
//import { User } from '..user.schema' ;

=======
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document , Schema as MongooseSchema} from "mongoose";
import { Reponse } from "./response.models";
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

export type ReclamationDocument = Reclamation & Document;

@Schema()
export class Reclamation {
 
<<<<<<< HEAD

  @Prop({ required: true })
  Category: string;

  @Prop({ required: true })
  Subject: string;

  @Prop({ required: true })
  Description: string;

 // @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
 // UserId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Reponse' }] })
  reponses: Reponse[];

}

export const ReclamationSchema = SchemaFactory.createForClass(Reclamation);
=======
  @Prop({ required: true})
  UserId: number;

  @Prop({ required: true})
  UserName: string;


  @Prop( { required: true})
  Category: string;

 
  @Prop( { required: true})
  Subject: string;

 
  @Prop( { required: true})
  Description : string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Reponse' }] })
 reponses: Reponse[];
}

export const ReclamationSchema = SchemaFactory.createForClass(Reclamation);
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
