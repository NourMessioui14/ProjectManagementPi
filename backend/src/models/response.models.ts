import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

 import { Document ,Schema as MongooseSchema} from "mongoose";
import { Reclamation } from "./reclamations.model";
 



export type ReponseDocument = Reponse & Document;

@Schema()
export class Reponse {
 
  @Prop({ required: true})
  text: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Reclamation' })
  reclamation: Reclamation;

}

export const ReponseSchema = SchemaFactory.createForClass(Reponse);