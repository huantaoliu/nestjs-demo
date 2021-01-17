import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './guard/local-auth-guard';
import { LoginRequestDTO } from './model/login.request.dto';
import { LoginResponseDTO } from './model/login.response.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiTags('Auth')
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: LoginResponseDTO,
  })
  async login(
    @Request() req,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    body: LoginRequestDTO,
  ) {
    // Body is only used for validation, and LocalAuthGuard will check user against db
    // if pass, guard will attach user obj to request, then we use it to generate JWT token
    return this.authService.login(req.user);
  }
}
