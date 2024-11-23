import { IsString, IsNumber, IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class UpdateDetalleVentaDto {
  @IsOptional()
  @IsString()
  idProducto?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  alturaM?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  baseM?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(0)
  cantidad?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  precioTotal?: number;

  @IsOptional()
  @IsString()
  idVenta?: string;
}
