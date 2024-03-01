import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScrumDocument = Scrum & Document

@Schema()
export class Scrum {
  @Prop()
  style: String;

  @Prop()
  color: String;
  
  @Prop()
  column: String;


}

export const ScrumSchema = SchemaFactory.createForClass(Scrum);
