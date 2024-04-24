import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ReclamationDto } from 'src/dto/reclamations.dto';
import { ReclamationsService } from './reclamations.service';
import { AuthGuard } from '@nestjs/passport';
import { Reclamation, ReclamationCategory, ReclamationDocument } from 'src/models/reclamations.model';

import { User } from 'src/auth/schemas/user.schema';
import { ReqUser } from 'src/auth/req-user.decorator';


@Controller('reclamations')
export class ReclamationsController {



    constructor(private readonly service : ReclamationsService) {};
     

    @UseGuards(AuthGuard('jwt'))
    @Post('/addReclamation')
    async createReclamation(
      @Body() reclamationDto: ReclamationDto,
      @ReqUser() user: User,
    ): Promise<Reclamation> {
      return this.service.create(reclamationDto, user);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get('/user-reclamations')
    async getUserReclamations(@ReqUser() user: User): Promise<Reclamation[]> {
        return this.service.findByUserId(user._id);
    }

    
    @Get('/categories')
    getCategories() {
      return { categories: Object.values(ReclamationCategory) };
    }

    @Get('/user/:id')
    async getUserById(@Param('id') userId: string): Promise<User> {
        return this.service.getUserById(userId);
    }

    @Put("/:id")
    Update( @Param('id') id: string , @Body() body: ReclamationDto) {
        return this.service.Update(id , body);
    }

    @Delete("/:id")
    Delete( @Param('id') id: string) {
        return this.service.Delete(id);
    }


/*
    @Put("/:id")
    async Update(@Param('id') id: string , @Body() body: ReclamationDto): Promise<ReclamationDocument | null> {
        return await this.service.Update(id , body);
    }*/


    


    /////////////////////////////////


    @Post()
    Add( @Body() Body: ReclamationDto) {
        return this.service.Add(Body);
    }

    @Get()
    async FinAll(): Promise<Reclamation[]> {
        return this.service.findAllWithUser();
    }

    // @Get()
    // FinAll() {
    //     return this.service.FinAll();
    // }

    @Get("/:id")
    FindById( @Param('id') id: string) {
        return this.service.FindById(id);
    }

    
   
/*
    @Delete(':id')
    async deleteReclamation(@Param('id') id: string): Promise<void> {
      await this.service.delete(id);
    } */

//     @Delete(':id')
//   async deleteReclamation(@Param('id') id: string): Promise<void> {
//     await this.service.delete(id);
//   }

    @Post('/search')
    Search(@Query('key')  key)
    {
        return this.service.Search();
    }





}