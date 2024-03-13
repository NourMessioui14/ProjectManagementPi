import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserRole } from 'src/auth/dto/signup.dto';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; 
    }
  
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.role) {
      if (requiredRoles.includes(user.role)) {
        return true;
      }
    }
  
    
    return false; 
  }
  }
