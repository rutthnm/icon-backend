import { IsString, IsDecimal, IsInt, IsOptional } from 'class-validator';

export class UpdateDetalleVentaDto {
  @IsOptional()
  @IsString()
  idProducto?: string;

  @IsOptional()
  @IsDecimal()
  alturaM?: number;

  @IsOptional()
  @IsDecimal()
  baseM?: number;

  @IsOptional()
  @IsInt()
  cantidad?: number;

  @IsOptional()
  @IsDecimal()
  precioTotal?: number;

  @IsOptional()
  @IsString()
  idVenta?: string;
}
