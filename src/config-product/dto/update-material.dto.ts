import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMaterialDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
