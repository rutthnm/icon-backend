import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
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

  @Get('/compras')
  @UseGuards(RolesGuard)
  @Roles('cliente')
  traerCompras(@Req() req: Request) {
    const id = req['user'].persona.idPersona
    return this.ventaService.traerCompras(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('administrador')
  traerVentas() {
   return this.ventaService.traerVentas();
  } 

  @Get('/compra/:id')
  @UseGuards(RolesGuard)
  @Roles('cliente', 'administrador')
  compra(@Param ('id')id:string) {
   return this.ventaService.compra(id);
  } 


}
