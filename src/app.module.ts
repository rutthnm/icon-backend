import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonasModule } from './personas/personas.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfigProductModule } from './config-product/config-product.module';
import { VentaModule } from './venta/venta.module';
import { Producto } from './productos/entities/producto.entity';
import { Categoria } from './config-product/entities/categoria.entity';
import { Presentacion } from './config-product/entities/presentacion.entity';
import { Material } from './config-product/entities/material.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Producto,Categoria,Presentacion,Material]),
    PersonasModule,
    ProductosModule,
    UsuariosModule,
    ConfigProductModule,
    VentaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
