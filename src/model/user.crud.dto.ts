import { IsArray, IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class UserCRUDDTO {
  @IsString()
  @MaxLength(20, { message: 'First Name should not exceed length of 20' })
  firstName: string;

  @IsString()
  @Length(1, 20, { message: 'Last Name should not exceed length of 20' })
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  title: string;

  @IsArray()
  roles: string[];
}
