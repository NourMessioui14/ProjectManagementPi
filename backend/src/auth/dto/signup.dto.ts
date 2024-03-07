import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export enum UserRole {
  Admin = 'admin',
  ScrumMaster = 'scrum_master',
  ProductOwner = 'product_owner',
  SimpleUser = 'simple_user',
}

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly adresse: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: UserRole;
}
