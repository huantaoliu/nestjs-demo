import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCRUDDTO } from '../model/user.crud.dto';
import { UserDTO } from '../model/user.dto';

@Injectable()
export class UserService {
  // we will latter replace with real db
  private users = [
    {
      id: 1,
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      title: 'Manager',
      roles: ['admin'],
    },
    {
      id: 2,
      firstName: 'regular',
      lastName: 'regular',
      email: 'regular@regular.com',
      password: '1234',
      title: 'Developer',
      roles: ['regular'],
    },
    {
      id: 3,
      firstName: 'Elli',
      lastName: 'Eskil',
      email: 'eskil@elli.com',
      password: '1234',
      title: 'Manager',
      roles: ['regular'],
    },
    {
      id: 4,
      firstName: 'Ruben',
      lastName: 'Yonatan',
      email: 'yonatan@ruben.com',
      password: '1234',
      title: 'Manager',
      roles: ['regular'],
    },
    {
      id: 5,
      firstName: 'Ofra',
      lastName: 'Tzila',
      email: 'tzila@ofra.com',
      password: '1234',
      title: 'Sells',
      roles: ['regular'],
    },
  ];

  getUsers() {
    return this.users;
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    return this.users.find((user) => user.email === email);
  }

  async getUserById(id: number): Promise<UserDTO> {
    const res = this.users.find((user) => user.id === id);
    if (res) {
      return res;
    } else {
      throw new NotFoundException(`can't find user with id ${id}`);
    }
  }

  update(id: number, user: UserCRUDDTO) {
    let updated = null;
    const targetIndex = this.users.findIndex((user) => user.id === id);
    if (targetIndex > -1) {
      let target = this.users.splice(targetIndex, 1);
      updated = { ...target[0], ...user };
      this.users = [...this.users, updated];
    }
    return updated;
  }

  deleteUserById(id: number) {
    let target = null;
    const targetIndex = this.users.findIndex((user) => user.id === id);
    if (targetIndex > -1) {
      target = this.users.splice(targetIndex, 1);
    }
    return target.length > 0 ? target[0] : null;
  }

  async createUser(user: UserCRUDDTO) {
    const newUser = {
      id: this.users.length + 1,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      title: user.title || '',
      email: user.email || undefined,
      roles: user.roles || [],
      password: '',
    };
    this.users = [...this.users, newUser];
    return { id: this.users.length };
  }
}
