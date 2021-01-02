import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { ArticleDTO } from '../model/article.dto';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getArticle(): Promise<ArticleDTO[]> {
    return this.articleService.getArticle();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ArticleDTO> {
    return this.articleService.getArticleById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body(new ValidationPipe({forbidNonWhitelisted: true, whitelist: true})) article: ArticleDTO): Promise<ArticleDTO> {
    return this.articleService.createArticle(article);
  }
}
