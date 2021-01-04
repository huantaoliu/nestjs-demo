import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDTO } from '../model/user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * local strategy, used for verify login
   * @param email
   * @param password
   */
  async validate(
    email: string,
    password: string,
  ): Promise<Omit<UserDTO, 'password'>> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
