import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Redirect,
  ValidationPipe,
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
  findOne(@Param('id', ParseIntPipe) id: number): UserDTO {
    return this.userServie.getUserById(id);
  }

  @Post()
  @HttpCode(201) // custom return code
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    user: UserDTO,
  ) {
    return this.userServie.createUser(user);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UserCRUDDTO,
  ) {
    return this.userServie.update(id, updateUser);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userServie.deleteUserById(id);
  }

  @Get('/help')
  @Redirect('http://docs.nestjs.com/controller', 302)
  userHelp() {
    const section = 'redirection';
    return { url: 'https://docs.nestjs.com/controller#' + section };
  }
}
