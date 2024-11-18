import { IsDecimal, IsString, MinLength, Min, IsOptional, IsPositive } from 'class-validator';

export class UpdateProductoDto{
  
    @IsString()
    @MinLength(1)
    @IsOptional()
    nombre?: string;
  
    @IsString()
    @MinLength(1)
    @IsOptional()
    descripcion?: string;
  
    @IsString()
    @MinLength(1)
    @IsOptional()
    idMaterial?: string;
  
    @IsString()
    @MinLength(1)
    @IsOptional()
    idPresentacion?: string;
  
    @IsString()
    @MinLength(1)
    @IsOptional()
    imagen?: string;
  
    @IsDecimal()
    @IsPositive() 
    @Min(0)
    @IsOptional()  
    precio?: number;
}
