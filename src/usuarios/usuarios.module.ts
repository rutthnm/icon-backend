import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Persona } from 'src/personas/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Persona])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
