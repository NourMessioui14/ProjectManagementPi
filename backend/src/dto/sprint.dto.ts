import { IsArray, IsDate, IsDateString, IsNotEmpty } from "class-validator";


export class SprintDto{

    @IsNotEmpty()
    sprintname: string;

    
    @IsDateString()
    startdate: string; // Format "YYYY-MM-DD"

    @IsDateString()
    enddate: string; // Format "YYYY-MM-DD"

    @IsNotEmpty()
    description: string;

    @IsArray()
    @IsNotEmpty()
    tickets: string[]; // Tableau d'identifiants de tickets


}