//chnaatbath tous les attributs eli f models 

import { IsNotEmpty } from "class-validator";


export class TicketDto{

    @IsNotEmpty()
    project: string;

    @IsNotEmpty()
    sprint: string;


    @IsNotEmpty()
    etat: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    responsable: string;


}