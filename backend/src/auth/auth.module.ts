import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
<<<<<<< HEAD
import { UserSchema } from './schemas/user.schema';
=======
import { User, UserSchema } from './schemas/user.schema';
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
import { RolesGuard } from 'src/roles/roles.guard';
import { Type } from 'class-transformer';
import { SessionSerializer } from './utils/SessionSerializer';
import { LocalStrategy } from './utils/LocalStrategy';
@Module({
  imports: [
    
    
    PassportModule.register({ defaultStrategy: 'jwt' , session: true}),
   
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
<<<<<<< HEAD
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
=======
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Utilisez User.name pour la cohérence
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
  ],
  controllers: [AuthController],
  providers: [  AuthService,
   JwtStrategy,LocalStrategy,SessionSerializer,RolesGuard],
<<<<<<< HEAD
  exports: [JwtStrategy, PassportModule,AuthService],
})
=======


   exports: [AuthService, JwtStrategy, PassportModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])], // Ajustez ici
  })
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
export class AuthModule {}
