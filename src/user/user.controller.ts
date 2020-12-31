import { Body, Controller, Get, HttpCode, Post, Redirect } from '@nestjs/common';
import { UserDTO } from '../model/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private userServie: UserService) {}

  @Get()
  getUser(): UserDTO[] {
    return this.userServie.getUsers();
  }

  @Post()
  @HttpCode(201) // custom return code
  create(@Body() user: UserDTO) {
    return this.userServie.createUser(user);
  }

  @Get('/help')
  @Redirect('http://docs.nestjs.com/controller', 302)
  userHelp() {
    const section = 'redirection';
    return {url: 'https://docs.nestjs.com/controller#'+ section}
  }
}
