<<<<<<< HEAD
import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class ReclamationDto {
   
  
=======
import { IsNotEmpty } from "class-validator";

export class ReclamationDto {
   
   
  @IsNotEmpty()

  UserId: number;

  
  @IsNotEmpty()

  UserName:string;
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

  @IsNotEmpty()
 
  Category: string;

  @IsNotEmpty()
 
  Subject: string;

  @IsNotEmpty()

  Description : string; 
<<<<<<< HEAD

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
  
  @IsOptional()
  reponses: any[]; // Ajoutez la propriété reponses, elle peut être de type any[] ou d'un type spécifique si nécessaire

=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    
}