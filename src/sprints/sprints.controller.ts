import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { Sprints } from 'src/models/sprints.models';

@Controller('sprints')
export class SprintsController {
    constructor(private readonly sprintService: SprintsService){};

  @Post()
  async createSprint(@Body() sprintDto: Sprints){
    return this.sprintService.createSprint(sprintDto)
  }
 
  @Get()
  readSprint(){
    return this.sprintService.readSprint()
  }

  @Get(':id')
    async getSprintById(@Param('id') sprintId: string) {
        return this.sprintService.getSprintById(sprintId);
    }

  @Put(':id')
    async updateSprint(@Param('id') sprintId: string, @Body() updatedSprint: Sprints) {
        return this.sprintService.updateSprint(sprintId, updatedSprint);
    }

  /*@Put(':id')
  async updateSprint(@Param('id') id:string, 
  @Body() updatedata: SprintUpdateDto):Promise<Sprints>{
    return this.sprintService.updateSprint(id, updatedata )
  }*/

@Delete(':id')
    async deleteSprint(@Param('id') id:string){
      return this.sprintService.deleteSprint(id)
    }

    @Post('/search')
    Search(@Query('key') key){
      return this.sprintService.Search(key);
    }


}
