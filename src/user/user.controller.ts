import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { UserCRUDDTO } from '../model/user.crud.dto';
import { UserDTO } from '../model/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userServie: UserService) {}

  @Get()
  getUser(): UserDTO[] {
    return this.userServie.getUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserDTO {
    return this.userServie.getUserById(Number(id));
  }

  @Post()
  @HttpCode(201) // custom return code
  create(@Body() user: UserCRUDDTO) {
    return this.userServie.createUser(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: UserCRUDDTO) {
    return this.userServie.update(Number(id), updateUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userServie.deleteUserById(Number(id));
  }

  @Get('/help')
  @Redirect('http://docs.nestjs.com/controller', 302)
  userHelp() {
    const section = 'redirection';
    return { url: 'https://docs.nestjs.com/controller#' + section };
  }
}
