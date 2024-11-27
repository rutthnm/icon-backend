import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { VentaService } from './venta.service';
import {
  CreateComprobanteDto,
  CreateDetalleVentaDto,
  CreateMasterDto,
  CreateVentaDto,
  UpdateMasterDto,
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
  @Post('detalle')
  createDetalleVenta(@Body() createDetalleVentaDto: CreateDetalleVentaDto) {
    return this.ventaService.createdetalleVenta(createDetalleVentaDto);
  }

  @Get('detalle/:id')
  findOneDetalleVenta(@Param('id') id: string) {
    return this.ventaService.findOnedetalleVenta(id);
  }

  //COMPROBANTE
  @Post('comprobante')
  createComprobante(@Body() createComprobanteDto: CreateComprobanteDto) {
    return this.ventaService.createComprobante(createComprobanteDto);
  }

  @Get('comprobante/:id')
  findOneComprobante(@Param('id') id: string) {
    return this.ventaService.findOneComprobante(id);
  }

  //MASTER
  @Post('master')
  createMaster(@Body() createMaster: CreateMasterDto) {
    return this.ventaService.createMaster(createMaster);
  }

  @Patch('master/:id')
  updateMaster(
    @Param('id') id: string,
    @Body() updateMasterDto: UpdateMasterDto,
  ) {
    return this.ventaService.update(id, updateMasterDto);
  }
}
