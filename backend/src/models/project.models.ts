import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import mongoose from "mongoose";
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
export type ProjectDocument = Project & Document;

@Schema()
export class Project {
<<<<<<< HEAD
=======
<<<<<<< HEAD
    
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id: mongoose.Types.ObjectId;
    
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    @Prop({ required: true }) // kima controle de saisie 
    projectname: string;

    @Prop({ required: true })
    chefdeprojet: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    startdate: string; // Format "YYYY-MM-DD"

    @Prop({ required: true })
    enddate: string; // Format "YYYY-MM-DD"

    @Prop({ default: false }) // Le type est Boolean, pas besoin de spécifier de manière explicite
    isFavorite: boolean; // Définition du type de données comme boolean
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
