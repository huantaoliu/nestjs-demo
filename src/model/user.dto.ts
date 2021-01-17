import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: number;

  @IsString()
  @MaxLength(20, { message: 'First Name should not exceed length of 20' })
  @ApiProperty()
  firstName: string;

  @IsString()
  @Length(1, 20, { message: 'Last Name should not exceed length of 20' })
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsArray()
  @ApiProperty()
  roles: string[];
}
