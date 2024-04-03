import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, UserRole } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { changePassDto } from './dto/changePass.dto';
import { EditProfileDto } from './dto/EditProfile.dto';
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
  try {
    return await this.userModel.findById(id).exec();
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de l'utilisateur : ${error.message}`);
  }
}




async update(id:string, body:SignUpDto){
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException('Invalid user ID');
  }

  return this.userModel.findByIdAndUpdate(id, body, { new: true });
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



 async findByEmail(email: string): Promise<User> {
  console.log('Recherche d\'utilisateur par email :', email);
  return this.userModel.findOne({ email });
} 







async getAdminData(userId: string): Promise<any> {
  const user = await this.userModel.findById(userId);

  if (!user || user.role !== UserRole.Admin) {
    throw new UnauthorizedException('Only admin can access this resource');
  }

  const allUsers = await this.userModel.find();

  return { allUsers };
}





async updateProfile(id: string, body: EditProfileDto): Promise<User> {
  try {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    if (body.name) {
      user.name = body.name;
    }
    if (body.email) {
      user.email = body.email;
    }
    if (body.adresse) {
      user.adresse = body.adresse;
    }
    if (body.age) {
      user.age = body.age;
    }
    if (body.role) {
      user.role = body.role;
    }

    await user.save();

    return user;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
  }
}


async changePass(changePassDto: changePassDto, user: User) {
  try {
    if (changePassDto.confirmNewPass !== changePassDto.newPass) {
      throw new HttpException(
        'La confirmation du mot de passe ne correspond pas au mot de passe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentUser = await this.userModel.findById(user._id);

    if (!currentUser) {
      throw new HttpException(
        'Utilisateur introuvable. Veuillez vous connecter à nouveau.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(changePassDto.newPass, salt);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword, salt: salt },
      { new: true },
    );

    return updatedUser;
  } catch (error) {
    throw new HttpException(
      `Erreur lors du changement de mot de passe: ${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}







async updateUserValue(id: string, updatedFields: Record<string, any>): Promise<User> {
  try {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}





async findOneById(id: string): Promise<User> {
  if (!id) {
    throw new BadRequestException('ID is required');
  }

  try {
    console.log('Trying to find user with ID:', id);
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    console.log('User found:', user); // Ajoutez ce log pour vérifier si l'utilisateur est trouvé
    return user;
  } catch (error) {
    console.error('Error finding user:', error); // Ajoutez ce log pour capturer les erreurs
    throw new Error(`Error finding user: ${error.message}`);
  }
}












}
