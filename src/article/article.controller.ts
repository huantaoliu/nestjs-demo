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
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth-guard';
import { ArticleDTO } from '../model/article.dto';
import { ArticleDateQueryDTO } from '../model/article.query.dto';
import { ArticleService } from './article.service';

@UseGuards(JwtAuthGuard)
@Controller('article')
@ApiTags('Article')
@ApiHeader({
  name: 'access_token',
  description: 'access token in header',
})
@ApiResponse({ status: 401, description: 'unauthorized' })
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [ArticleDTO] })
  async getArticle(
    @Req() req,
    @Query(ValidationPipe) query: ArticleDateQueryDTO,
  ): Promise<ArticleDTO[]> {
    return this.articleService.getArticle(req.user.id, query);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Article not found' })
  @ApiResponse({ status: 200, description: 'OK', type: ArticleDTO })
  async findOne(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ArticleDTO> {
    return this.articleService.getArticleById(req.user.id, id);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Created', type: ArticleDTO })
  async create(
    @Req() req,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    article: ArticleDTO,
  ): Promise<ArticleDTO> {
    return this.articleService.createArticle(req?.user?.id, article);
  }
}
