import { IsString, MinLength } from 'class-validator';

export class CreatePresentacionDto {
  @IsString()
  @MinLength(1)
  nombre: string;
}
