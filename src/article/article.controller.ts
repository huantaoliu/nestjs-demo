import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
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
  async findOne(@Param('id') id: string): Promise<ArticleDTO> {
    return this.articleService.getArticleById(Number(id));
  }

  @Post()
  @HttpCode(201)
  async create(@Body() article: ArticleDTO): Promise<ArticleDTO> {
    return this.articleService.createArticle(article);
  }
}
