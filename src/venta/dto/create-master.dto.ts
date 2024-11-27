import { IsString, MinLength, IsPositive, IsNumber } from 'class-validator';

export class CreateMasterDto {
  @IsString()
  @MinLength(1)
  serie: string;

  @IsNumber()
  @IsPositive()
  numeracion: number;
}
