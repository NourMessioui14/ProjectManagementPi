import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, validate } from 'class-validator';
import { UserRole } from './signup.dto';


export class EditProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly adresse: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  readonly password?: string; // Rendre le champ password optionnel

  @IsNotEmpty()
  @IsString()
  readonly role: UserRole;

  async validatePassword(): Promise<string[]> {
    if (!this.password) {
      return [];
    }
    const errors = await validate(this);
    return errors.map(error => Object.values(error.constraints)).flat();
  }
}
