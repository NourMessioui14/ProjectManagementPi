import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Project, ProjectDocument, ProjectSchema } from "./project.models";
import { UserDocument, UserSchema } from "src/auth/schemas/user.schema";
export type TicketDocument = Ticket & Document ;

 @Schema()
 export class Ticket{
   
    @Prop({ type: ProjectSchema }) // Utilisez la référence au schéma du modèle de projet
    project: ProjectDocument; // Utilisez le type du document du modèle de projet ici

    @Prop({required:true})
    sprint : string ; 


    @Prop({required:true})
    typeOfticket : string ; 
  
   
    @Prop({required:true})
    etat : string ;

    @Prop({required:true})
    description : string ; 
  
   
    @Prop({ type: UserSchema }) // Utilisez la référence au schéma du modèle de projet
    responsable:UserDocument ; // Utilisez le type du document du modèle de projet ici



    

 }
export const TicketSchema = SchemaFactory.createForClass(Ticket);


