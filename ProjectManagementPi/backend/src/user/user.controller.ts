import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service'; // Make sure to import your UserService
import { UserDto } from 'src/dto/user.dto'; // Make sure to import your UserDto

@Controller('users')
export class UserController {

    constructor(private readonly service: UserService) {}

    @Post()
    createUser(@Body() body: UserDto) {
        return this.service.create(body);
    }

    @Get()
    findAllUsers() {
        return this.service.findAll();
    }

    @Get('/:id')
    findOneUser(@Param() { id }) {
        return this.service.findOne(id);
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() body: UserDto) {
        return this.service.update(id, body);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
