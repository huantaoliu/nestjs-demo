import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CommentDTO } from './comment.dto';

export class ArticleDTO {
  @IsNumber()
  @IsOptional()
  @ApiResponseProperty()
  id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsOptional()
  @ApiResponseProperty()
  comments: CommentDTO[];

  @ApiResponseProperty()
  @IsOptional()
  publishDate: Date;
}
