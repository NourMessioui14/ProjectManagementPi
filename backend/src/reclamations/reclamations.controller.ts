import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ReclamationDto } from 'src/dto/reclamations.dto';
import { ReclamationsService } from './reclamations.service';

@Controller('reclamations')
export class ReclamationsController {



    constructor(private readonly service : ReclamationsService) {};
     
    @Post()
    Add( @Body() Body: ReclamationDto) {
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
    Update( @Param('id') id: string , @Body() body: ReclamationDto) {
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



}
