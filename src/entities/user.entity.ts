import { type } from 'os';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity } from 'typeorm';
import { UserDTO } from '../model/user.dto';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  title: string;

  @Column('simple-array', { nullable: true })
  roles: string[];

  @OneToMany((type) => ArticleEntity, (article) => article.owner)
  articles: ArticleEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.creator)
  comments: CommentEntity[];

  toUserDTO(): UserDTO {
    return {
      id: this.id,
      firstName: this?.firstName,
      lastName: this?.lastName,
      email: this?.email,
      password: this?.password,
      title: this?.title,
      roles: this?.roles,
    };
  }
}
