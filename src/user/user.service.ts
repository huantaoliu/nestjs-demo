import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserCRUDDTO } from '../model/user.crud.dto';
import { UserDTO } from '../model/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, 'nestjsdemo')
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserDTO[]> {
    const users: UserEntity[] = await this.userRepository.find();
    return users.map((user) => user.toUserDTO());
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user?.toUserDTO();
  }

  async getUserById(id: number): Promise<UserDTO> {
    const res = await this.userRepository.findOne({
      where: { id },
    });
    if (res) {
      return res.toUserDTO();
    } else {
      throw new NotFoundException(`can't find user with id ${id}`);
    }
  }

  async update(id: number, user: UserCRUDDTO) {
    let res = await this.userRepository.findOne({
      where: { id },
    });
    if (!res) {
      throw new NotFoundException(`can't find user with id ${id}`);
    }
    await this.userRepository.update({ id }, user);
    res = await this.userRepository.findOne({
      where: { id },
    });
    return res.toUserDTO();
  }

  async deleteUserById(id: number): Promise<UserDTO> {
    const res = await this.userRepository.findOne({
      where: { id },
    });
    if (!res) {
      throw new NotFoundException(`can't find user with id ${id}`);
    }
    await this.userRepository.remove(res);
    return res.toUserDTO();
  }

  async createUser(user: UserCRUDDTO) {
    return await this.userRepository.save(user);
  }
}
