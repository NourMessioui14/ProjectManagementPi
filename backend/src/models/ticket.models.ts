import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type TicketDocument = Ticket & Document ;
 @Schema()
 export class Ticket{
    @Prop({required : true}) // kima controle de saisie 
project: string ; 

    @Prop({required:true})
    typeOfticket : string ; 
  
   
    @Prop({required:true})
    etat : string ;

    @Prop({required:true})
    description : string ; 
  
   
    @Prop({required:true})
    responsable : string ;


    

 }
export const TicketSchema = SchemaFactory.createForClass(Ticket);


