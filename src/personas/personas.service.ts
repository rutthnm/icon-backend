import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Crear una nueva persona
  async create(createPersonaDto: CreatePersonaDto) {
    const newPersona = this.personaRepository.create(createPersonaDto);
    return await this.personaRepository.save(newPersona);
  }

  // Actualizar una persona
  async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.personaRepository.preload({
      id, // Usamos 'id' para encontrar la persona, ya que 'id' es el UUID
      ...updatePersonaDto, // Asignamos los valores que queremos actualizar
    });

    if (!persona) {
      throw new NotFoundException(`Persona con id ${id} no encontrada`);
    }

    return this.personaRepository.save(persona); // Guarda los cambios
  }

  // Eliminar (o desactivar) una persona
  async remove(id: string) {
    const persona = await this.personaRepository.findOne({ where: { id } });

    if (!persona) {
      throw new NotFoundException(`Persona con id ${id} no encontrada`);
    }

    // Cambiar el estado de la persona a false en lugar de eliminarla
    persona.estado = false;
    return this.personaRepository.save(persona);
  }

  // Obtener todas las personas
  async findAll() {
    return this.personaRepository.find();
  }

  // Obtener una persona específica por ID
  async findOne(id: string) {
    const persona = await this.personaRepository.findOne({ where: { id } });

    if (!persona) {
      throw new NotFoundException(`Persona con id ${id} no encontrada`);
    }

    return persona;
  }
}
