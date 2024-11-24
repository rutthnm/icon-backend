import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/jwt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Persona]),
    JwtModule.register({
      global: true,
      secret: 'iconografico',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService],
})
export class UsuariosModule {}
