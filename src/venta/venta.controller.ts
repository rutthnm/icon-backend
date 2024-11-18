import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VentaService } from './venta.service';
import {
  CreateComprobanteDto,
  CreateDetalleVentaDto,
  CreateVentaDto,
} from './dto';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  //VENTA
  @Post()
  createVenta(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.createVenta(createVentaDto);
  }

  @Get(':id')
  findOneVenta(@Param('id') id: string) {
    return this.ventaService.findOneVenta(id);
  }

  //DETALLE
  @Post()
  createDetalleVenta(@Body() createDetalleVentaDto: CreateDetalleVentaDto) {
    return this.ventaService.createdetalleVenta(createDetalleVentaDto);
  }

  @Get(':id')
  findOneDetalleVenta(@Param('id') id: string) {
    return this.ventaService.findOnedetalleVenta(id);
  }

  //COMPROBANTE
  @Post()
  createComprobante(@Body() createComprobanteDto: CreateComprobanteDto) {
    return this.ventaService.createComprobante(createComprobanteDto);
  }

  @Get(':id')
  findOneComprobante(@Param('id') id: string) {
    return this.ventaService.findOneComprobante(id);
  }
}
