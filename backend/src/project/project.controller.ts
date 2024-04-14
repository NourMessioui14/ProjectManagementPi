import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from 'src/dto/project.dto';

@Controller('project')
export class ProjectController {

    constructor(private readonly service: ProjectService) {}
    
    @Post()
    Addproject(@Body() body:ProjectDto) {
        return this.service.Add(body);
    }
    
    @Get()
    FindAllproject() {
        return this.service.FindAllproject();
    }

    @Get('/:id')
    FindOne(@Param() {id}){
        return this.service.FindOneproject(id);
    }
    @Put('/:id')
    Update(@Param('id') id:string,@Body() body:ProjectDto){
        return this.service.Updateproject(id,body);
    }
  

    @Delete('/:id')
    Delete(@Param('id') id:String){
        return this.service.Deleteproject(id);
    }

    @Put(':id/favorite')
async toggleFavorite(@Param('id') id: string) {
    return this.service.toggleFavorite(id);
}




}
