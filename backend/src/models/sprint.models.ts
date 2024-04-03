import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProjectDocument, ProjectSchema } from "./project.models";
import { Ticket, TicketSchema } from "./ticket.models";
export type SprintDocument = Sprint & Document ;
 @Schema()
 export class Sprint{

    @Prop({required : true})
    sprintname: string ; 
     
    @Prop({ type: ProjectSchema }) 
    project: ProjectDocument;

   
    @Prop({required:true})
    description : string ;

    @Prop({ required: true })
    startdate: string;

    @Prop({ required: true })
    enddate: string;

    @Prop({ type: TicketSchema, default: [] })
    tickets: Ticket[];
 }
export const SprintSchema = SchemaFactory.createForClass(Sprint);


