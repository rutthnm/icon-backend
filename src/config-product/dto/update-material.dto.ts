import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateMaterialDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombre?: string;

}
