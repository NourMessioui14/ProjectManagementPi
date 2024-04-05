import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class ReclamationDto {
   
  

  @IsNotEmpty()
 
  Category: string;

  @IsNotEmpty()
 
  Subject: string;

  @IsNotEmpty()

  Description : string; 

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
  
  @IsOptional()
  reponses: any[]; // Ajoutez la propriété reponses, elle peut être de type any[] ou d'un type spécifique si nécessaire

    
}