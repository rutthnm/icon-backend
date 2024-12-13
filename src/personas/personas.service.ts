import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  // Actualizar una persona
  async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.personaRepository.preload({
      idPersona: id,
      ...updatePersonaDto, // Asignamos los valores que queremos actualizar
    });

    if (!persona) {
      throw new NotFoundException(`Persona con id ${id} no encontrada`);
    }

    return this.personaRepository.save(persona); // Guarda los cambios
  }

  // Obtener una persona específica por ID
  async findOne(idPersona: string) {
    if (!idPersona)
      throw new BadRequestException('No se mando el id de la persona');

    const persona = await this.personaRepository.findOne({
      where: { idPersona: idPersona },
      select: ['nombres', 'apellidos', 'documento', 'nDocumento', 'telefono'],
    });

    if (!persona) {
      throw new NotFoundException(`Persona con id ${idPersona} no encontrada`);
    }

    return persona;
  }
}
