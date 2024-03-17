import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import { RoleEnum } from '../../interfaces/enums';

const console = new Logger('RolesQuard');

@Injectable()
export class RolesQuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.get<string[]>(
        ROLES_KEY,
        context.getHandler(),
      );

      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' && !token) {
        throw new UnauthorizedException({ message: "User don't authorized" });
      }
      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      req.user = user;

      if (user.role === RoleEnum.ROOT) return true;
      return requiredRoles.includes(user.role);
    } catch (error) {
      throw new HttpException('Method Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
