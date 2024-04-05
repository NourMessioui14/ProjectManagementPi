import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Reponse } from './response.models';
//import { User } from '..user.schema' ;


export type ReclamationDocument = Reclamation & Document;

@Schema()
export class Reclamation {
 

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
