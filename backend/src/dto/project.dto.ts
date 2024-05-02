//chnaatbath tous les attributs eli f models 

import { IsDate, IsDateString, IsNotEmpty } from "class-validator";


export class ProjectDto{

    @IsNotEmpty()
    projectname: string;

    @IsNotEmpty()
    chefdeprojet: string;
    @IsDateString()
    startdate: string; // Format "YYYY-MM-DD"

    @IsDateString()
    enddate: string; // Format "YYYY-MM-DD"

    @IsNotEmpty()
    description: string;

}