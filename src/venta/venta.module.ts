import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { detalleVenta } from './entities/detalleventa.entity';
import { Comprobante } from './entities/comprobante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, detalleVenta, Comprobante])],
  controllers: [VentaController],
  providers: [VentaService],
})
export class VentaModule {}
