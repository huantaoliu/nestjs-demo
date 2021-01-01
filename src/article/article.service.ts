import { Injectable } from '@nestjs/common';
import { ArticleDTO } from '../model/article.dto';

@Injectable()
export class ArticleService {

  private articles = [
    {id: 0, name: 'my article one', owner: 1},
    {id: 1, name: 'how to article', owner: 1},
    {id: 2, name: 'how to write test', owner: 2},
    {id: 3, name: 'nest in 20 hours', owner: 3},
    {id: 4, name: 'heefe', owner: 2},

  ];

  async getArticle(): Promise<ArticleDTO[]> {
    return this.articles;
  }

  async getArticleById(id: number) {
    return this.articles.find(article => article.id === id);
  }

  async createArticle(article: ArticleDTO): Promise<ArticleDTO> {
    article.id = this.articles.length;
    this.articles = [...this.articles, article];
    return article;
  }
}
