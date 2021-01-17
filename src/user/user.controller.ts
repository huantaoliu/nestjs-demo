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
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '../auth/role.enum';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth-guard';
import { RolesGuard } from '../guard/roles.guard';
import { UserCRUDDTO } from '../model/user.crud.dto';
import { UserDTO } from '../model/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@ApiTags('User')
@ApiHeader({
  name: 'access_token',
  description: 'access token in header',
})
@ApiResponse({ status: 401, description: 'unauthorized' })
@Controller('user')
export class UserController {
  constructor(private userServie: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [UserDTO] })
  async getUser(): Promise<UserDTO[]> {
    return this.userServie.getUsers();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiResponse({ status: 200, description: 'OK', type: UserDTO })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    return this.userServie.getUserById(id);
  }

  @Post()
  @HttpCode(201) // custom return code
  @Roles(Role.Admin) // only admin can create user
  @UseGuards(RolesGuard)
  @ApiForbiddenResponse({
    description: 'User does not have enough right to do such operation',
  })
  @ApiResponse({ status: 201, description: 'Created', type: UserDTO })
  create(
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    user: UserDTO,
  ) {
    return this.userServie.createUser(user);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'OK', type: UserCRUDDTO })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    updateUser: UserCRUDDTO,
  ) {
    return this.userServie.update(id, updateUser);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiForbiddenResponse({
    description: 'User does not have enough right to do such operation',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiResponse({ status: 200, description: 'OK' })
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
