import { Type } from 'class-transformer';
import { IsString, IsEmail, ValidateNested, IsNotEmpty } from 'class-validator';
import { CreatePersonaDto } from 'src/personas/dto/create-persona.dto';
import { Persona } from 'src/personas/entities/persona.entity';

export class CreateUsuarioDto {
  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;

  @IsString()
  rol: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona: Persona;
}
