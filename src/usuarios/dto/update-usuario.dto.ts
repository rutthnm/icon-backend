import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()  
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  contrasena?: string;

  @IsOptional()
  @IsString()
  rol?: string;

  @IsOptional()
  @IsString()
  idPersona?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
