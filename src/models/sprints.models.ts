import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SprintsDocument = Sprints & Document

@Schema()
export class Sprints {
  @Prop()
  startDate: Date;

  @Prop()
  endDate : Date;
/*
  @Prop
  complexite : Complexite;
  (simple, moyen, complex)
  */
  /*
  @Prop 
  priorite : Priorite
  (haute , moyenne, basse)
   */

}

export const SprintsSchema = SchemaFactory.createForClass(Sprints);
