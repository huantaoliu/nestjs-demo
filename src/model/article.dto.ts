import {
  IsDataURI,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserDTO } from './user.dto';

export class ArticleDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  publishDate: Date;
}
