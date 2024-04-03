import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

export class SessionSerializer extends PassportSerializer {

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    constructor(
      private readonly authService: AuthService,
      @Inject(JwtService) private readonly jwtService: JwtService,
    ) {
      super();
    }
          
    serializeUser(user: any, done: (err: Error, user?: any) => void) {
      console.log('serializeUser received user:', user);
    
      if (user && user.token) {
        done(null, user.token);
      } else {
        done(new Error('Invalid user object: Missing token property'), null);
      }
    }
        
                
      async deserializeUser(userId: string, done: (err: Error, user: User) => void) {
        console.log('deserializeUser', userId);
      
        try {
          const decodedToken = this.jwtService.decode(userId) as { id: string };
      
          // Fetch user information from the database using the extracted user ID
          const userDB = await this.authService.findOne(decodedToken.id);
      
          return userDB ? done(null, userDB) : done(null, null);
        } catch (error) {
          done(error, null);
        }
      }
      }
<<<<<<< HEAD
=======
=======
  constructor(
    private readonly authService: AuthService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {
    super();
  }

  async serializeUser(user: any, done: (err: Error, user?: any) => void) {
    try {
      if (!user || !user.token) {
        throw new Error('Invalid user object: Missing token property');
      }
      console.log('serializeUser received user:', user);
      done(null, user.token);
    } catch (error) {
      done(error, null);
    }
  }

  async deserializeUser(userId: string, done: (err: Error, user: User | null) => void) {
    try {
      console.log('deserializeUser', userId);
      const decodedToken = this.jwtService.decode(userId) as { id: string } | null;
      if (!decodedToken || !decodedToken.id) {
        throw new Error('Invalid token');
      }
      const userDB = await this.authService.findOne(decodedToken.id);
      done(null, userDB || null);
    } catch (error) {
      done(error, null);
    }
  }
  }
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
