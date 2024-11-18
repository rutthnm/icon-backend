import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
