import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type ProjectDocument = Project & Document ;
 @Schema()
 export class Project{
    @Prop({required : true}) // kima controle de saisie 
projectname: string ; 
    @Prop({required:true})
    chefdeprojet : string ; 
  
   
    @Prop({required:true})
    description : string ;

    @Prop({ required: true })
    startdate: string; // Format "YYYY-MM-DD"

    @Prop({ required: true })
    enddate: string; // Format "YYYY-MM-DD"

 }
export const ProjectSchema = SchemaFactory.createForClass(Project);


