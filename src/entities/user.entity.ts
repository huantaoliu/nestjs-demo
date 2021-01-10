import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity } from 'typeorm';

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
}
