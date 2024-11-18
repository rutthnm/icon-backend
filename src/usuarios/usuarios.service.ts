import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    const newUsuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(newUsuario);
  }

  findAllAdmin() {
    return this.usuarioRepository.find({
      where: {
        rol: 'Admin',
      },
    });
  }

  findOneLogin(correo: string, constrasena: string) {
    return this.usuarioRepository.findOne({
      where: {
        correo: correo,
        contrasena: constrasena,
      },
    });
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }

  remove(id: string) {
    return this.usuarioRepository.update(id, { estado: false });
  }
}
