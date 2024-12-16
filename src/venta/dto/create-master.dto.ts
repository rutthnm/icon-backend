import { IsString, IsNumber } from 'class-validator';

export class CreateMasterDto {
  @IsString()
  serie: string;

  @IsNumber()
  numeracion: number;
}
