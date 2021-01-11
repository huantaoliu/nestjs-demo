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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Role } from '../auth/role.enum';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth-guard';
import { RolesGuard } from '../guard/roles.guard';
import { UserCRUDDTO } from '../model/user.crud.dto';
import { UserDTO } from '../model/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userServie: UserService) {}

  @Get()
  async getUser(): Promise<UserDTO[]> {
    return this.userServie.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    return this.userServie.getUserById(id);
  }

  @Post()
  @HttpCode(201) // custom return code
  @Roles(Role.Admin) // only admin can create user
  @UseGuards(RolesGuard)
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
