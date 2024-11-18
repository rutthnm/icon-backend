import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsBoolean()
  estado: boolean;
}
