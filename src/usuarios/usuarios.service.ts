import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async create({ persona, ...createUsuarioDto }: CreateUsuarioDto) {
    try {
      if (persona) {
        const newPersona = this.personaRepository.create(persona);
        await this.personaRepository.save(newPersona);
        const { contrasena, ...createUsuario } = createUsuarioDto;

        const newUsuario = this.usuarioRepository.create({
          contrasena: bcrypt.hashSync(contrasena, 10),
          ...createUsuario,
          persona: newPersona,
        });
        await this.usuarioRepository.save(newUsuario);
        return newUsuario;
      } else {
        throw new BadRequestException('idPersona es requerido');
      }
    } catch (error) {
      throw new BadRequestException('El usuario fue creado incorrectamente');
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
      relations: ['persona'],
    });

    if (!usuario || !bcrypt.compareSync(contrasena, usuario.contrasena)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      id: usuario.idUsuario,
      rol: usuario.rol,
      persona: usuario.persona,
      estado: usuario.estado,
    };

    const { rol, persona } = usuario;

    const { nombres, apellidos } = persona;

    return {
      rol: rol,
      nombre: nombres.split(' ')[0],
      apellido: apellidos.split(' ')[0],
      jwt: this.jwtService.sign(payload),
    };
  }
}
