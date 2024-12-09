import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      return next();
    }

    if (!token.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token inválido. Asegúrate de usar el formato "Bearer <token>".',
      );
    }

    try {
      const decoded = this.jwtService.verify(token.split(' ')[1]);
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
