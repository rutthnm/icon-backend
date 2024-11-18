import { Module } from '@nestjs/common';
import { ConfigProductService } from './config-product.service';
import { ConfigProductController } from './config-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Material } from './entities/material.entity';
import { Presentacion } from './entities/presentacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Material, Presentacion])],
  controllers: [ConfigProductController],
  providers: [ConfigProductService],
})
export class ConfigProductModule {}
