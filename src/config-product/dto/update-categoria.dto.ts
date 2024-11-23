import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombre?: string;
}
