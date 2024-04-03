import { EditProfileDto } from './dto/EditProfile.dto';
import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Req, Session, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto, UserRole } from './dto/signup.dto'; // Import UserRole correctly
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import session from 'express-session';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard, LocalAuthGuard } from './guard/LocalGuard';
import { Request } from 'express';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { AllowAllGuard } from './utils/AllowAllGuard';
import { JwtAuthGuard } from './guard/JwtAuthGuard';
import { CurrentUser } from './utils/CurrentUser';
import { getUser } from './decorator/get-user.decorator';
import { changePassDto } from './dto/changePass.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService  ,  private jwtService: JwtService, // Injecter JwtService
  ) {}

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
    
  @Get("/users")
  findAll(){
     return this.authService.findAll();
  }

   @Get("users/:id")
  findOne(@Param('id') id: string){
         return this.authService.findOne(id);
      } 



    @Put("put/:id")
      update(@Param('id') id: string, @Body() body: SignUpDto){
         return this.authService.update(id, body);
      }

      @Delete("users/:id")
      Delete(@Param('id') id: string){
         return this.authService.delete(id);
      }

       @Get("/usermail/:email")
      findEmail(@Param('email') email: string) {
        return this.authService.findByEmail(email);
      } 
      
      

      @Get('/backoffice')
      @Roles('Admin') 
      @UseGuards(JwtAuthGuard) 
      async getProtectedResource(@Session() session: Record<string, any>) {
        const adminData = await this.authService.getAdminData(session.userId);
        
        return adminData;
      }



      @Get('user/:id') // Mettez à jour le chemin de la route avec l'ID
      async getUserById(@Param('id') id: string) {
        if (!id) {
          throw new BadRequestException('ID is required');
        }
        return this.authService.findOneById(id);
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

  @Put('/users/update/:id')
  async updateUser(@Param('id') id: string, @Body() body: EditProfileDto): Promise<User> {
    try {
      return await this.authService.updateProfile(id, body);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  }




  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@getUser() user: User) {
    console.log('Détails de l\'utilisateur :', user);
    return { user };
  }



  @UseGuards(AllowAllGuard)
  @Get('/userId')
  getUserId(@getUser() user: User) {
    return user._id;
  }
  
  


  

  @UseGuards(JwtAuthGuard)
  @Patch('/changePass')
  async changePass(@Body() changePassDto: changePassDto, @getUser() user: User) {
    try {
      const updatedUser = await this.authService.changePass(changePassDto, user);
      return { message: 'Password changed successfully', user: updatedUser };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
    


  @Patch(':id')
  async updateUserValue(@Param('id') id: string, @Body() updatedFields: Record<string, any>): Promise<User> {
    return this.authService.updateUserValue(id, updatedFields);
  }
  
  
  }











    
