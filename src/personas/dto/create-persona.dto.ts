import { IsString, MinLength } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @MinLength(1)
  nombres: string;

  @IsString()
  @MinLength(1)
  apellidos: string;

  @IsString()
  @MinLength(1)
  documento: string;

  @IsString()
  @MinLength(1)
  nDocumento: string;

  @IsString()
  @MinLength(1)
  telefono: string;
}
