import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productos])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
