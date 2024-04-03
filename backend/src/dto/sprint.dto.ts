<<<<<<< HEAD
import { IsArray, IsDate, IsDateString, IsNotEmpty,ValidateNested } from "class-validator";
import { TicketDto } from "./ticket.dto";
=======
import { IsArray, IsDate, IsDateString, IsNotEmpty } from "class-validator";
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920


export class SprintDto{

    @IsNotEmpty()
    sprintname: string;

<<<<<<< HEAD
    @IsNotEmpty()
    project: string;

=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
    
    @IsDateString()
    startdate: string; // Format "YYYY-MM-DD"

    @IsDateString()
    enddate: string; // Format "YYYY-MM-DD"

    @IsNotEmpty()
    description: string;

    @IsArray()
<<<<<<< HEAD
    @ValidateNested({ each: true })
    tickets: TicketDto[];
=======
    @IsNotEmpty()
    tickets: string[]; // Tableau d'identifiants de tickets
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920


}