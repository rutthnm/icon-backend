import { IsString, IsDecimal, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateVentaDto {
  @IsString()
  idPersona: string;

  @IsDateString()
  fecha: Date;

  @IsDecimal()
  subTotal: number;

  @IsDecimal()
  igv: number;

  @IsString()
  tipoPago: string;

  @IsString()
  idUsuario: string;
}
