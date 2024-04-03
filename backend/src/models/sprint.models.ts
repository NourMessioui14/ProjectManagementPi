import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
<<<<<<< HEAD
import { ProjectDocument, ProjectSchema } from "./project.models";
import { Ticket, TicketSchema } from "./ticket.models";
export type SprintDocument = Sprint & Document ;
 @Schema()
 export class Sprint{

    @Prop({required : true})
    sprintname: string ; 
     
    @Prop({ type: ProjectSchema }) 
    project: ProjectDocument;

=======
import { TicketDocument, TicketSchema } from "./ticket.models";
export type SprintDocument = Sprint & Document ;

 @Schema()
 export class Sprint{
    @Prop({required : true}) // kima controle de saisie 
sprintname: string ; 
     
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
   
    @Prop({required:true})
    description : string ;

    @Prop({ required: true })
<<<<<<< HEAD
    startdate: string;

    @Prop({ required: true })
    enddate: string;

    @Prop({ type: TicketSchema, default: [] })
    tickets: Ticket[];
=======
    startdate: string; // Format "YYYY-MM-DD"

    @Prop({ required: true })
    enddate: string; // Format "YYYY-MM-DD"

    // @Prop({ type: [{ type: String }] }) // Tableau d'identifiants de tickets
    // tickets: string[];

    @Prop({ type: [TicketSchema] }) // Utilisez la référence au schéma du modèle de projet
    ticket: TicketDocument; // Utilisez le type du document du modèle de projet ici

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
 }
export const SprintSchema = SchemaFactory.createForClass(Sprint);


