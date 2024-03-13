import { IsNotEmpty } from "class-validator";

export class ReponseDto {
   
   
  @IsNotEmpty()
 
  text: string;


    
}