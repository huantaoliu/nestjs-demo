import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UserDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @MaxLength(20, { message: 'First Name should not exceed length of 20' })
  firstName: string;

  @IsString()
  @Length(1, 20, { message: 'Last Name should not exceed length of 20' })
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  title: string;

  @IsArray()
  roles: string[];
}
