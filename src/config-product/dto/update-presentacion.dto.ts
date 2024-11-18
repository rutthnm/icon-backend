import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePresentacionDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
