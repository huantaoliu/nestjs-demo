import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { ArticleEntity } from '../entities/article.entity';
import { ArticleDTO } from '../model/article.dto';
import { ArticleDateQueryDTO } from '../model/article.query.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity, 'nestjsdemo')
    private articleRepository: Repository<ArticleEntity>,
  ) {}

  async getArticle(
    userId: number,
    dateQuery: ArticleDateQueryDTO,
  ): Promise<ArticleDTO[]> {
    let option;
    if (dateQuery && Object.keys(dateQuery).length > 0) {
      option = dateQuery.endDate
        ? {
            where: {
              createdAt: Between(dateQuery.startDate, dateQuery.endDate),
            },
          }
        : {
            where: { createdAt: MoreThanOrEqual(dateQuery.startDate) },
          };
      option.where = {
        ...option.where,
        ownerId: userId,
      };
    } else {
      option = { where: { ownerId: userId } };
    }

    const articleEnties = await this.articleRepository.find(option);
    return articleEnties.map((articleEntity: ArticleEntity) =>
      articleEntity.toArticleDTO(),
    );
  }

  async getArticleById(userId: number, id: number) {
    const articleEntity = await this.articleRepository.findOne({
      where: { ownerId: userId },
      relations: ['comments'],
    });

    if (articleEntity) {
      return articleEntity.toArticleDTO();
    } else {
      throw new NotFoundException(`can't find article with id ${id}`);
    }
  }

  async createArticle(
    userId: number,
    article: ArticleDTO,
  ): Promise<ArticleDTO> {
    const articleEntity = new ArticleEntity();
    articleEntity.name = article.name;
    articleEntity.ownerId = userId;
    const res = await this.articleRepository.save(articleEntity);
    return res.toArticleDTO();
  }
}
