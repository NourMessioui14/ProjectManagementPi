import { IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { User } from "src/auth/schemas/user.schema";
import { ReclamationCategory } from "src/models/reclamations.model";

export class ReclamationDto {
  @IsNotEmpty()
  @IsEnum(ReclamationCategory)
  Category: ReclamationCategory;

  @IsNotEmpty()
  Subject: string;

  @IsNotEmpty()
  Description: string;

  @IsOptional()
  user: User;

  @IsOptional()
  reponses: any[];
}