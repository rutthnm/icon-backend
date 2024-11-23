import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class UpdateVentaDto {
  @IsOptional()
  @IsString()
  idPersona?: string;

  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  subTotal?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  igv?: number;

  @IsOptional()
  @IsString()
  tipoPago?: string;

  @IsOptional()
  @IsString()
  idUsuario?: string;
}
