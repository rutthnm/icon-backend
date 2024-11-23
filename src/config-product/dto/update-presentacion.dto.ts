import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdatePresentacionDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombre?: string;
}
