import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../model/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate a user by email and password. this is used for login
   * we validate user and pass exist, and then will generate a JWT token for following
   * request
   * @param email
   * @param pass
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserDTO, 'password'>> {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * generate a JWT token for valid login
   * @param user
   */
  async login(user: Omit<UserDTO, 'password'>) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
