import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Project, ProjectDocument, ProjectSchema } from "./project.models";
import { UserDocument, UserSchema } from "src/auth/schemas/user.schema";
import { SprintDocument, SprintSchema } from "./sprint.models";

@Schema()
export class Ticket {
 
  @Prop({ type: Types.ObjectId, ref: 'Project' })
project: Types.ObjectId | ProjectDocument;



  @Prop({ type: Types.ObjectId, ref: 'Sprint' }) // Assurez-vous que cette référence est correcte également
  sprint: Types.ObjectId | SprintDocument;

  @Prop({ required: true })
  typeOfticket: string;

  @Prop({ required: true })
  etat: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // Référence au modèle User
  responsable: Types.ObjectId | UserDocument;
}

export type TicketDocument = Ticket & Document;
export const TicketSchema = SchemaFactory.createForClass(Ticket);