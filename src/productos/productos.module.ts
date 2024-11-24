import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/config-product/entities/categoria.entity';
import { Material } from 'src/config-product/entities/material.entity';
import { Presentacion } from 'src/config-product/entities/presentacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria, Material,Presentacion])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
