import {
  IsString,
  MinLength,
  IsPositive,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateMasterDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  serie: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  numeracion: number;
}
