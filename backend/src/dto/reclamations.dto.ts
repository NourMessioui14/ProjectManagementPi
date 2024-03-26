import { IsNotEmpty } from "class-validator";

export class ReclamationDto {
   
   
  @IsNotEmpty()

  UserId: number;

  
  @IsNotEmpty()

  UserName:string;

  @IsNotEmpty()
 
  Category: string;

  @IsNotEmpty()
 
  Subject: string;

  @IsNotEmpty()

  Description : string; 
    
}