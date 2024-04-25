import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDto } from 'src/dto/ticket.dto';
import { Ticket } from 'src/models/ticket.models';

@Controller('ticket')
export class TicketController{

    constructor(private readonly service: TicketService) {}
    
    @Post()
    Addticket(@Body() body:TicketDto) {
        return this.service.AddTicket(body);
    }

    @Get()
    FindAllTicket() {
        return this.service.FindAllticket();
    }

    @Get('/:id')
    FindOne(@Param() {id}){
        return this.service.FindOneticket(id);
    }
    @Put('/:id')
    Update(@Param('id') id:string,@Body() body:TicketDto){
        return this.service.Updateticket(id,body);
    }
  

    @Delete('/:id')
    Delete(@Param('id') id:String){
        return this.service.Deleteticket(id);
    }
// Dans ticket.controller.ts


@Get('/byproject/:projectId')
async getTicketsByProjectId(@Param('projectId') projectId: string) {
    return await this.service.findAllTicketsByProjectId(projectId);
}
@Post('/create-from-description')
async createTicketFromDescription(@Body() body: { description: string }) {
    try {
        const newTicket = await this.service.createTicketFromDescription(body.description);
        return { success: true, message: 'Ticket créé avec succès', ticket: newTicket };
    } catch (error) {
        return { success: false, message: 'Erreur lors de la création du ticket', error: error.message };
    }
}
}






