import { IsString, IsInt } from 'class-validator';

export class CreateComprobanteDto {
  @IsString()
  serie: string; // B001 - F001

  @IsInt()
  numeracion: number;

  @IsString()
  tipoComprobante: string;

  @IsString()
  idVenta: string;
}
