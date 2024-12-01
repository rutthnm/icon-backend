import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/personas/entities/persona.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-usuario.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    private readonly jwtService: JwtService,
  ) {}

  async create({ idPersona, ...createUsuarioDto }: CreateUsuarioDto) {
    try {
      if (idPersona) {
        const newPersona = this.personaRepository.create(idPersona);
        await this.personaRepository.save(newPersona);

        const { contrasena, ...createUsuario } = createUsuarioDto;

        const newUsuario = this.usuarioRepository.create({
          contrasena: bcrypt.hashSync(contrasena, 10),
          ...createUsuario,
          idPersona: newPersona,
        });
        await this.usuarioRepository.save(newUsuario);
        return newUsuario;
      } else {
        throw new HttpException(
          'idPersona es requerido',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'El usuario fue creado incorrectamente',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllAdmin() {
    return await this.usuarioRepository.find({
      where: {
        rol: 'administrador',
        estado: true,
      },
      select: ['idUsuario', 'correo'],
    });
  }

  async login({ correo, contrasena }: LoginDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      relations: ['idPersona'],
    });

    console.log(usuario);

    if (!usuario || !bcrypt.compareSync(contrasena, usuario.contrasena)) {
      throw new HttpException(
        'Credenciales incorrectas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (usuario.estado === false) {
      throw new HttpException(
        'Esta cuenta fue eliminada, cree otra cuenta',
        HttpStatus.NOT_FOUND,
      );
    }

    const payload = {
      id: usuario.idUsuario,
      rol: usuario.rol,
      idPersona: usuario.idUsuario,
      estado: usuario.estado,
    };

    const { idPersona } = usuario;

    const { nombres, apellidos } = idPersona;

    return {
      usuario: {
        idPersona: {
          nombres: nombres.split(' ')[0], // Primer nombre
          apellidos: apellidos.split(' ')[0], // Primer apellido
        },
      },
      jwt: this.jwtService.sign(payload),
    };
  }
}
