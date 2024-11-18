import { IsString, IsDecimal, IsInt } from 'class-validator';

export class CreateDetalleVentaDto {
  @IsString()
  idProducto: string;

  @IsDecimal()
  alturaM: number;

  @IsDecimal()
  baseM: number;

  @IsInt()
  cantidad: number;

  @IsDecimal()
  precioTotal: number;

  @IsString()
  idVenta: string;
}
