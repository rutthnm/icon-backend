import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdatePersonaDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombres: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  apellidos: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  documento: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  nDocumento: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  telefono: string;
}
