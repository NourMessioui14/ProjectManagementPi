import { IsArray, IsDate, IsDateString, IsNotEmpty,ValidateNested } from "class-validator";
import { TicketDto } from "./ticket.dto";


export class SprintDto{

    @IsNotEmpty()
    sprintname: string;

    @IsNotEmpty()
    project: string;

    
    @IsDateString()
    startdate: string; // Format "YYYY-MM-DD"

    @IsDateString()
    enddate: string; // Format "YYYY-MM-DD"

    @IsNotEmpty()
    description: string;

    @IsArray()
    @ValidateNested({ each: true })
    tickets: TicketDto[];


}