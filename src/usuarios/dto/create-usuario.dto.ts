import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;

  @IsString()
  rol: string;

  @IsString()
  idPersona: string; 
  
  @IsOptional() 
  @IsBoolean()
  estado?: boolean;
}
