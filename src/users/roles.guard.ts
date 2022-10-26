import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //what is the required role?
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    // does the user have the role?
    // const { user } = context.switchToHttp().getRequest();  // this would be available from authentication

    //mock it
    // const user: User = {
    const user = {
      name: 'will',
      roles: [Role.ADMIN],
      //   roles: [Role.USER],
    };

    return requireRoles.some((role) => user.roles.includes(role));
  }
}
