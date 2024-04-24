import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Reponse } from './response.models';

export enum ReclamationCategory {
  BUG = 'Bug',
  ENHANCEMENT = 'Enhancement',
  MissingDocumentation = 'Missing Documentation',
  Other = 'Other',

  
  // Ajoutez d'autres catégories au besoin
}

export type ReclamationDocument = Reclamation & Document;

@Schema()
export class Reclamation {
  @Prop({ required: true, enum: ReclamationCategory })
  Category: ReclamationCategory;

  @Prop({ required: true })
  Subject: string;

  @Prop({ required: true })
  Description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Reponse' }] })
  reponses: Reponse[];
}

export const ReclamationSchema = SchemaFactory.createForClass(Reclamation);