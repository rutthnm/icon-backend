import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generarJWT(payload: object): string {
    return this.jwtService.sign(payload);
  }

  verificarJWT(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
