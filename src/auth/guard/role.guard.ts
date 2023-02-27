import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role_id: number = this._reflector.get<number>(
      'role_id',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const hasRole = () => user.role_id == role_id;

    return user && user.role_id && hasRole();
  }
}
