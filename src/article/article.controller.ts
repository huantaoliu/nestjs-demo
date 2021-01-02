import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleDTO } from '../model/article.dto';
import { ArticleDateQueryDTO } from '../model/article.query.dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getArticle(
    @Query(ValidationPipe) query: ArticleDateQueryDTO,
  ): Promise<ArticleDTO[]> {
    return this.articleService.getArticle(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ArticleDTO> {
    return this.articleService.getArticleById(id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    article: ArticleDTO,
  ): Promise<ArticleDTO> {
    return this.articleService.createArticle(article);
  }
}
