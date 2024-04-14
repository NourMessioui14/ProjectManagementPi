import { IsArray, IsDate, IsDateString, IsNotEmpty,ValidateNested } from "class-validator";
import { TicketDto } from "./ticket.dto";


export class SprintDto{

    @IsNotEmpty()
    sprintname: string;

    @IsNotEmpty()
    project: string;

    @IsNotEmpty()
    description: string;
    
    @IsDateString()
    startdate: string; // Format "YYYY-MM-DD"

    @IsDateString()
    enddate: string; // Format "YYYY-MM-DD"

    

    // @IsArray()
    // @ValidateNested({ each: true })
    // tickets: TicketDto[];


}