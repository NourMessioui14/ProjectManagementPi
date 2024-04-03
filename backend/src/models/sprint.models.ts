import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TicketDocument, TicketSchema } from "./ticket.models";
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

    // @Prop({ type: [{ type: String }] }) // Tableau d'identifiants de tickets
    // tickets: string[];

    @Prop({ type: [TicketSchema] }) // Utilisez la référence au schéma du modèle de projet
    ticket: TicketDocument; // Utilisez le type du document du modèle de projet ici

 }
export const SprintSchema = SchemaFactory.createForClass(Sprint);


