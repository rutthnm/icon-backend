import { IsString, IsEmail} from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;

  @IsString()
  rol: string;

  @IsString()
  idPersona: string; 
}
