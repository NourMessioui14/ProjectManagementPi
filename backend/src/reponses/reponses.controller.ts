import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ReponsesService } from './reponses.service';
import { ReponseDto } from 'src/dto/reponse.dto';

@Controller('reponses')
export class ReponsesController {
    constructor(private readonly service : ReponsesService) {};
    
    @Delete('/all')
    DeleteAll() {
        return this.service.DeleteAll();
    }
     
    @Post()
    Add( @Body() Body: ReponseDto) {
        return this.service.Add(Body);
    }


    @Get()
    FinAll() {
        return this.service.FinAll();
    }

    @Get("/:id")
    FindById( @Param('id') id: string) {
        return this.service.FindById(id);
    }

    
    @Put("/:id")
    Update( @Param('id') id: string , @Body() body: ReponseDto) {
        return this.service.Update(id , body);
    }

    @Delete("/:id")
    Delete( @Param('id') id: string) {
        return this.service.Delete(id);
    }

    @Post('/search')
    Search(@Query('key')  key)
    {
        return this.service.Search();
    }



  @Post(':reclamationId')
  async addReponseToReclamation(@Param('reclamationId') reclamationId: string, @Body() reponseDto: ReponseDto) {
    try {
      return await this.service.addReponseToReclamation(reclamationId, reponseDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }




    
}

