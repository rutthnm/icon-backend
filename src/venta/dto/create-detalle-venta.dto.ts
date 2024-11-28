import { IsString, IsInt, IsNumber, IsPositive, Min, IsOptional } from 'class-validator';

export class CreateDetalleVentaDto {
  @IsString()
  idProducto: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  @IsOptional()
  alturaM?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  @IsOptional()
  baseM?: number;

  @IsInt()
  @IsPositive()
  @Min(0)
  cantidad: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  precioTotal: number;

  @IsString()
  idVenta: string;
}
