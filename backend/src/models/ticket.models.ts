<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Project, ProjectDocument, ProjectSchema } from "./project.models";
import { UserDocument, UserSchema } from "src/auth/schemas/user.schema";
export type TicketDocument = Ticket & Document ;

 @Schema()
 export class Ticket{
<<<<<<< HEAD
=======
=======

export type TicketDocument = Ticket & Document ;



import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose"; // Importer Types à partir de mongoose
import { Project, ProjectDocument, ProjectSchema } from "./project.models";
import { UserDocument, UserSchema } from "src/auth/schemas/user.schema";
import { SprintDocument, SprintSchema } from "./sprint.models";

@Schema()
export class Ticket {
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
   
    @Prop({ type: ProjectSchema }) // Utilisez la référence au schéma du modèle de projet
    project: ProjectDocument; // Utilisez le type du document du modèle de projet ici

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
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


<<<<<<< HEAD
=======
=======
    
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

export const TicketSchema = SchemaFactory.createForClass(Ticket);
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
