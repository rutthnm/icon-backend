import {
  IsString,
  IsDateString,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateVentaDto {
  @IsString()
  idPersona: string;

  @IsDateString()
  fecha: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  subTotal: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  igv: number;

  @IsString()
  tipoPago: string;

  @IsString()
  idUsuario: string;
}
