import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
<<<<<<< HEAD
import { TicketDocument, TicketSchema } from "./ticket.models";
export type SprintDocument = Sprint & Document ;
=======
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

>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
 @Schema()
 export class Sprint{
    @Prop({required : true}) // kima controle de saisie 
sprintname: string ; 
     
<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
   
    @Prop({required:true})
    description : string ;

    @Prop({ required: true })
<<<<<<< HEAD
=======
<<<<<<< HEAD
    startdate: string;

    @Prop({ required: true })
    enddate: string;

    @Prop({ type: TicketSchema, default: [] })
    tickets: Ticket[];
=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    startdate: string; // Format "YYYY-MM-DD"

    @Prop({ required: true })
    enddate: string; // Format "YYYY-MM-DD"

    // @Prop({ type: [{ type: String }] }) // Tableau d'identifiants de tickets
    // tickets: string[];

    @Prop({ type: [TicketSchema] }) // Utilisez la référence au schéma du modèle de projet
    ticket: TicketDocument; // Utilisez le type du document du modèle de projet ici

<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
 }
export const SprintSchema = SchemaFactory.createForClass(Sprint);


