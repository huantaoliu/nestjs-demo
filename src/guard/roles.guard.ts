import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../auth/role.enum';
import { ROLES_KEY } from '../auth/roles.decorator';
import { UserService } from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get roles from the custom decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // get user obj from request (was attached by authentication trough the token in header)
    const { user } = context.switchToHttp().getRequest();
    const userRoles = await this.userService.getUserById(user.id);

    if (requiredRoles.some((role) => userRoles.roles?.includes(role))) {
      return true;
    } else {
      throw new ForbiddenException(
        'This user does not have the right role to do the operation.',
      );
    }
  }
}
