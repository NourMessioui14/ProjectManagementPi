import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto, UserRole } from './dto/signup.dto'; // Import UserRole correctly
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import session from 'express-session';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/LocalGuard';
import { Request } from 'express';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>): Promise<{ token: string }> {
      const user = await this.authService.login(loginDto);
  
      session.token = user.token;
  
      return user;
  }
    
//@UseGuards(AuthenticatedGuard)
  @Get("/users")
  findAll(){
     return this.authService.findAll();
  }
   @Get("users/:id")
  findOne(@Param('id') id: string){
         return this.authService.findOne(id);
      } 
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
      @UseGuards(AuthenticatedGuard, RolesGuard) 
      async getProtectedResource(@Session() session: Record<string, any>) {
        const adminData = await this.authService.getAdminData(session.userId);
        
        // Vous pouvez renvoyer ces données à votre application frontend
        return adminData;
      }
      
      

  @Get()
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.userId);
    session.authenticated = true;
    return session;

  }
  


  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Session() session: Record<string, any>) {
    if (session.authenticated) {
      return { authenticated: true, userId: session.userId };
    } else {
      return { authenticated: false };
    }
  }

  @Post('/logout')
  async logout(@Session() session: Record<string, any>): Promise<{ message: string }> {
    try {
      session.blacklistedTokens = session.blacklistedTokens || [];
      session.blacklistedTokens.push(session.token);

      session.token = null;
      session.userId = null;
      session.authenticated = false;

      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Error during logout:', error);
      return { message: 'Logout failed' };
    }
  }
















    }
