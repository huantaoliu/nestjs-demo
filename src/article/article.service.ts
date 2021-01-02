import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { ArticleDTO } from '../model/article.dto';
import { ArticleDateQueryDTO } from '../model/article.query.dto';

@Injectable()
export class ArticleService {
  private articles = [
    {
      id: 0,
      name: 'my article one',
      publishDate: new Date('2020-12-01'),
      owner: 1,
    },
    {
      id: 1,
      name: 'how to article',
      publishDate: new Date('2020-12-11'),
      owner: 1,
    },
    {
      id: 2,
      name: 'how to write test',
      publishDate: new Date('2020-12-02'),
      owner: 2,
    },
    {
      id: 3,
      name: 'nest in 20 hours',
      publishDate: new Date('2020-12-05'),
      owner: 3,
    },
    { id: 4, name: 'heefe', publishDate: new Date('2020-12-05'), owner: 2 },
  ];

  async getArticle(dateQuery: ArticleDateQueryDTO): Promise<ArticleDTO[]> {
    if (dateQuery && Object.keys(dateQuery).length > 0) {
      const result = this.articles.filter((article) => {
        return dateQuery.endDate
          ? article.publishDate > new Date(dateQuery.startDate) &&
              article.publishDate < new Date(dateQuery.endDate)
          : article.publishDate > new Date(dateQuery.startDate);
      });
      return result;
    } else {
      return this.articles;
    }
  }

  async getArticleById(id: number) {
    return this.articles.find((article) => article.id === id);
  }

  async createArticle(article: ArticleDTO): Promise<ArticleDTO> {
    article.id = this.articles.length;
    this.articles = [...this.articles, article];
    return article;
  }
}
