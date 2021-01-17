import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, Length, MaxLength } from 'class-validator';
import { type } from 'os';

export class UserCRUDDTO {
  @IsString()
  @MaxLength(20, { message: 'First Name should not exceed length of 20' })
  @ApiPropertyOptional()
  firstName?: string;

  @IsString()
  @Length(1, 20, { message: 'Last Name should not exceed length of 20' })
  @ApiPropertyOptional()
  lastName?: string;

  @IsEmail()
  @ApiPropertyOptional()
  email: string;

  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsArray()
  @ApiPropertyOptional({
    type: [String],
  })
  roles: string[];
}
