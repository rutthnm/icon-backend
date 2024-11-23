import {
  IsString,
  MinLength,
  Min,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateProductoDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  idCategoria?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  nombre?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  descripcion?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  idMaterial?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  idPresentacion?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  imagen?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  precio?: number;
}
