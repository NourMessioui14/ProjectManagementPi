import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document , Schema as MongooseSchema} from "mongoose";
import { Reponse } from "./response.models";

export type ReclamationDocument = Reclamation & Document;

@Schema()
export class Reclamation {
 
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