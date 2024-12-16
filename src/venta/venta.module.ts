import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { detalleVenta } from './entities/detalleventa.entity';
import { Comprobante } from './entities/comprobante.entity';
import { Master } from './entities/master.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, detalleVenta, Comprobante, Master, Usuario, Producto]),
  ],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule {}
