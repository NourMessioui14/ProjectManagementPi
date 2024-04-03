import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintDto } from 'src/dto/sprint.dto';
import { TicketService } from 'src/ticket/ticket.service';

@Controller('sprint')
export class SprintController {

    
    constructor(private readonly service: SprintService, private readonly ticketService: TicketService) {}

    @Post()
    Addsprint(@Body() body:SprintDto) {
        return this.service.Add(body);
    }

    @Get()
    FindAllsprint() {
        return this.service.FindAllsprint();
    }

    @Get('/:id')
    FindOne(@Param() {id}){
        return this.service.FindOnesprint(id);
    }
    @Put('/:id')
    Update(@Param('id') id:string,@Body() body:SprintDto){
        return this.service.Updatesprint(id,body);
    }
  

    @Delete('/:id')
    Delete(@Param('id') id:String){
        return this.service.Deletesprint(id);
    }

    // @Get('/:id/tickets')
    // async findTicketsBySprintId(@Param('id') id: string) {
    //     const sprint = await this.service.FindOnesprint(id);
    //     if (!sprint) {
    //         throw new NotFoundException('Sprint not found');
    //     }
        
    //     const tickets = await this.ticketService.findTicketsByProjectId(sprint.project._id);
    //     return tickets;
    // }


    // @Post('/:sprintId/tickets/assign')
    // async assignTicketsToSprint(
    //     @Param('sprintId') sprintId: string,
    //     @Body() body: { ticketIds: string[] }
    // ) {
    //     const { ticketIds } = body;

    //     try {
    //         // Check if sprint exists
    //         const sprint = await this.service.FindOnesprint(sprintId);
    //         if (!sprint) {
    //             throw new NotFoundException('Sprint not found');
    //         }

    //         // Retrieve tickets from provided IDs
    //         const tickets = await Promise.all(ticketIds.map(ticketId => this.ticketService.FindOneticket(ticketId)));

    //         // Assign tickets to the sprint
    //         sprint.tickets = tickets;

    //         // Save the changes to the database
    //         return await sprint.save();
    //     } catch (error) {
    //         throw new Error(`Failed to assign tickets to sprint: ${error.message}`);
    //     }
    // }


}
