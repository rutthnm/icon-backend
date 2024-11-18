import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePresentacionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsBoolean()
  estado: boolean;
}
