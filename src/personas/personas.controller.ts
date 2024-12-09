import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('personas')
@UseGuards(RolesGuard)
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Get('perfil')
  @Roles('cliente', 'administrador')
  findOne(@Req() req: Request) {
    const idPersona = req['user'].persona.idPersona;
    return this.personasService.findOne(idPersona);
  }

  // Actualizar una persona
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personasService.update(id, updatePersonaDto);
  }
}
