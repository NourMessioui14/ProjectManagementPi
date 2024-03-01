import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ScrumService } from './scrum.service';
import { Scrum } from 'src/models/scrum.models';

@Controller('scrum')
export class ScrumController {
    constructor(private readonly scrumservice: ScrumService){};

  @Post()
  async createScrum(@Body() sprintDto: Scrum){
    return this.scrumservice.createScrum(sprintDto)
  }
 
  @Get()
  readScrum(){
    return this.scrumservice.readScrum()
  }

  @Get(':id')
    async getScrumById(@Param('id') scrumId: string) {
        return this.scrumservice.getScrumById(scrumId);
    }

  @Put(':id')
    async updateScrum(@Param('id') scrumId: string, @Body() updatedScrum: Scrum) {
        return this.scrumservice.updateScrum(scrumId, updatedScrum);
    }
 

@Delete(':id')
    async deleteScrum(@Param('id') id:string){
      return this.scrumservice.deleteScrum(id)
    }
}
