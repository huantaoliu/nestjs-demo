import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity, Entity } from 'typeorm';
import { UserDTO } from '../model/user.dto';

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
