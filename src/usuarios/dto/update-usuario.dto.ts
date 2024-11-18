import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()  
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  contrasena?: string;
}
