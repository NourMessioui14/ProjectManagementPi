import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id: mongoose.Types.ObjectId;
    
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
