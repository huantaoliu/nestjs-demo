import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth-guard';
import { ArticleDTO } from '../model/article.dto';
import { ArticleDateQueryDTO } from '../model/article.query.dto';
import { ArticleService } from './article.service';

@UseGuards(JwtAuthGuard)
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async getArticle(
    @Req() req,
    @Query(ValidationPipe) query: ArticleDateQueryDTO,
  ): Promise<ArticleDTO[]> {
    return this.articleService.getArticle(req.user.id, query);
  }

  @Get(':id')
  async findOne(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ArticleDTO> {
    return this.articleService.getArticleById(req.user.id, id);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Req() req,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    article: ArticleDTO,
  ): Promise<ArticleDTO> {
    return this.articleService.createArticle(req?.user?.id, article);
  }
}
