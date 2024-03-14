import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintDto } from 'src/dto/sprint.dto';

@Controller('sprint')
export class SprintController {

    constructor(private readonly service: SprintService) {}
    
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




}