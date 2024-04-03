import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDto } from 'src/dto/ticket.dto';

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
<<<<<<< HEAD


    

    // @Get('/project/:projectName')
    // findTicketsByProjectName(@Param('projectName') projectName: string) {
    //     return this.service.findTicketsByProjectName(projectName);
    // }

    @Get('/project/:projectId')
  GetTicketsByProjectId(@Param('projectId') projectId: string) {
    return this.service.GetTicketsByProjectId(projectId);
  }
    
=======
// Dans ticket.controller.ts


@Get('/byproject/:projectId')
async getTicketsByProjectId(@Param('projectId') projectId: string) {
    return await this.service.findAllTicketsByProjectId(projectId);
}



>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

}
