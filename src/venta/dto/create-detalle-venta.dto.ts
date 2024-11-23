import { IsString, IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateDetalleVentaDto {
  @IsString()
  idProducto: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  alturaM: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  baseM: number;

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
