import { Module } from '@nestjs/common';
import { UserController } from './user.controller'; // Make sure to adjust the import based on your actual file structure
import { UserService } from './user.service'; // Make sure to adjust the import based on your actual file structure
import { User, UserSchema } from 'src/models/user.models'; // Make sure to adjust the import based on your actual file structure
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
