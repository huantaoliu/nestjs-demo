import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  ownerId: number;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @CreateDateColumn({ nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.articles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];

  toArticleDTO() {
    return {
      id: this.id,
      name: this.name,
      comments: this.comments ? [...this.comments] : [],
      publishDate: this.createdAt,
    };
  }
}
