import { IsString, IsDecimal, IsDateString, IsOptional } from 'class-validator';

export class UpdateVentaDto {
  @IsOptional()
  @IsString()
  idPersona?: string;

  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @IsOptional()
  @IsDecimal()
  subTotal?: number;

  @IsOptional()
  @IsDecimal()
  igv?: number;

  @IsOptional()
  @IsString()
  tipoPago?: string;

  @IsOptional()
  @IsString()
  idUsuario?: string;
}
