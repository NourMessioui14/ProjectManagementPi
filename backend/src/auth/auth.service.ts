import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, UserRole } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  
    ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password ,adresse,age,role} = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      adresse,
      age,
      password: hashedPassword,
      role
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

// authService.ts

async login(loginDto: LoginDto): Promise<{ id: string; token: string; role: string }> {
  const { email, password } = loginDto;

  const user = await this.userModel.findOne({ email });

  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const token = this.jwtService.sign({ id: user._id, role: user.role });

  return { id: user._id, token, role: user.role };
}


 findAll(){
  return this.userModel.find();
 }

 async findOne(id: string): Promise<User> {
  return this.userModel.findOne({ _id: id }).exec();
}
update(id:string, body:SignUpDto){
  const objectId = new Types.ObjectId(id);

  return this.userModel.findOneAndUpdate(
      {_id: objectId},
      {$set:body},
      {new:true}
  );
}

async delete(id: string) {
  try {
    const result = await this.userModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    return { success: true, message: 'Utilisateur supprimé avec succès' };
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
  }
}




findOneByEmail(email: string) {
  console.log('Searching for user by email:', email);
  return this.userModel.findOne({ email: email });
}



async getAdminData(userId: string): Promise<any> {
  const user = await this.userModel.findById(userId);

  if (!user || user.role !== UserRole.Admin) {
    throw new UnauthorizedException('Only admin can access this resource');
  }

  const allUsers = await this.userModel.find();

  return { allUsers };
}










}
