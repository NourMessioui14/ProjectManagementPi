import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto, UserRole } from './dto/signup.dto'; // Import UserRole correctly
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')  
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }


  @Get("/users")
  findAll(){
     return this.authService.findAll();
  }
 /*  @Get("users/:id")
  findOne(@Param('id') id: string){
         return this.authService.findOne(id);
      } */
    @Put("users/:id")
      update(@Param('id') id: string, @Body() body: SignUpDto){
         return this.authService.update(id, body);
      }

      @Delete("users/:id")
      Delete(@Param('id') id: string){
         return this.authService.delete(id);
      }

      @Get(":email")
      findEmail(@Param('email') email: string) {
        return this.authService.findOneByEmail(email);
      }
      
      

  @Get('/backoffice')
  @Roles('Admin') 
  @UseGuards(RolesGuard) 
  getProtectedResource() {
  }
}
