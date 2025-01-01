// src/auth/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private reflector: Reflector) {}

 async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; 
    }

    const { user } = context.switchToHttp().getRequest();
    const userIsExist = await this.userService.findOne(user.id);
    return requiredRoles.some((role) => userIsExist.role_name === role);
  }
}
