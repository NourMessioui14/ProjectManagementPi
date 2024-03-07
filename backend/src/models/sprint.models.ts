import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type SprintDocument = Sprint & Document ;
 @Schema()
 export class Sprint{
    @Prop({required : true}) // kima controle de saisie 
sprintname: string ; 
     
   
    @Prop({required:true})
    description : string ;

    @Prop({ required: true })
    startdate: string; // Format "YYYY-MM-DD"

    @Prop({ required: true })
    enddate: string; // Format "YYYY-MM-DD"

 }
export const SprintSchema = SchemaFactory.createForClass(Sprint);


