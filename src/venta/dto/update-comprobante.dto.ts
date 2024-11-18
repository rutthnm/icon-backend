import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateComprobanteDto {
  @IsOptional()
  @IsString()
  serie?: string;

  @IsOptional()
  @IsInt()
  numeracion?: number;

  @IsOptional()
  @IsString()
  tipoComprobante?: string;

  @IsOptional()
  @IsString()
  idVenta?: string;
}
