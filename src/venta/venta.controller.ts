import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { VentaService } from './venta.service';
import {
  CreateDetalleVentaDto,
  CreateMasterDto,
} from './dto';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  //VENTA
  @Post()
  @UseGuards(RolesGuard)
  @Roles('cliente')
  createVenta(@Req() req: Request, @Body() createDetalleVentaDto: CreateDetalleVentaDto) {
    const idUsuario = req['user'].id;
    return this.ventaService.createVenta(idUsuario, createDetalleVentaDto);
  }

  @Post('/master')
  crearMaster(@Body() masterDto: CreateMasterDto){
    return this.ventaService.createMaster(masterDto)
  }
}
