import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string, done: (error: any, user?: any, info?: any) => void): Promise<any> {
        try {
          const loginDto: LoginDto = { email, password };
          const user = await this.authService.login(loginDto);
      
          if (!user) {
            return done(new UnauthorizedException('Invalid email or password'), null);
          }
      
<<<<<<< HEAD
          // Make sure user object has 'id' and 'role' properties
=======
<<<<<<< HEAD
          // Make sure user object has 'id' and 'role' properties
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
          if (!user.id || !user.role) {
            return done(new UnauthorizedException('User object is missing ID or role'), null);
          }
      
          return done(null, { id: user.id, token: user.token, role: user.role });
        } catch (error) {
          return done(error, null);
        }
      }
          
                
                }
