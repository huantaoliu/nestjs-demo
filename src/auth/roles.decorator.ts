import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';
/**
 * Custom decorator, attach defined roles for each request handler
 * and can be fetched to compare with user's role in the request handler function
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
