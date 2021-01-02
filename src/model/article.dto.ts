import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ArticleDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  owner: number;
}
