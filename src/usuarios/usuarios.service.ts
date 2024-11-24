import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/personas/entities/persona.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth/jwt.service';
import { LoginDto } from './dto/logrio-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    private readonly jwtService: AuthService,
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
          idPersona: newPersona.idPersona,
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

  async findOne(correo: string) {
    return await this.usuarioRepository.findOne({
      where: {
        correo: correo,
      },
    });
  }

  findAllAdmin() {
    return this.usuarioRepository.find({
      where: {
        rol: 'administrador',
        estado: true,
      },
    });
  }

  async login({ correo, contrasena }: LoginDto): Promise<string> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { correo },
      });

      if (!usuario || !bcrypt.compareSync(contrasena, usuario.contrasena)) {
        throw new Error('Credenciales incorrectas');
      }

      const payload = { id: usuario.idUsuario, rol: usuario.rol };
      return this.jwtService.generarJWT(payload);
    } catch (error) {
      throw new HttpException(
        'Error al registrarse, asegure que sus datos esten colocados correctamente',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }

  remove(id: string) {
    return this.usuarioRepository.update(id, { estado: false });
  }
}
