import {
  IsBoolean,
  IsDecimal,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MinLength(1)
  idCategoria: string;

  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  descripcion: string;

  @IsString()
  @MinLength(1)
  idMaterial: string;

  @IsString()
  @MinLength(1)
  idPresentacion: string;

  @IsString()
  @MinLength(1)
  imagen: string;

  @IsDecimal()
  @MinLength(1)
  precio: number;
}
