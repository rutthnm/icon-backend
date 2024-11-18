import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsBoolean()
  estado: boolean;
}
