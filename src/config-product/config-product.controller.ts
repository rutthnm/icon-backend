import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigProductService } from './config-product.service';
import {
  CreateCategoriaDto,
  CreateMaterialDto,
  CreatePresentacionDto,
  UpdateCategoriaDto,
  UpdateMaterialDto,
  UpdatePresentacionDto,
} from './dto';

@Controller('config-product')
export class ConfigProductController {
  constructor(private readonly configProductService: ConfigProductService) {}

  // CATEGORIA
  @Post('categoria')
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.configProductService.createCategoria(createCategoriaDto);
  }

  @Get('categoria')
  findAllCategoria() {
    return this.configProductService.findAllCategoria();
  }

  @Get('categoria/:id')
  findOneCategoria(@Param('id') id: string) {
    return this.configProductService.findOneCategoria(id);
  }

  @Patch('categoria/:id')
  updateCategoria(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.configProductService.updateCategoria(id, updateCategoriaDto);
  }

  @Delete('categoria/:id')
  removeCategoria(@Param('id') id: string) {
    return this.configProductService.removeCategoria(id);
  }

  // MATERIAL
  @Post('material')
  createMaterial(@Body() createMaterialDto: CreateMaterialDto) {
    return this.configProductService.createMaterial(createMaterialDto);
  }

  @Get('material')
  findAllMaterial() {
    return this.configProductService.findAllMaterial();
  }

  @Get('material/:id')
  findOneMaterial(@Param('id') id: string) {
    return this.configProductService.findOneMaterial(id);
  }

  @Patch('material/:id')
  updateMaterial(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.configProductService.updateMaterial(id, updateMaterialDto);
  }

  @Delete('material/:id')
  removeMaterial(@Param('id') id: string) {
    return this.configProductService.removeMaterial(id);
  }

  // PRESENTACION
  @Post('presentacion')
  createPresentacion(@Body() createPresentacionDto: CreatePresentacionDto) {
    return this.configProductService.createPresentacion(createPresentacionDto);
  }

  @Get('presentacion')
  findAllPresentacion() {
    return this.configProductService.findAllPresentacion();
  }

  @Get('presentacion/:id')
  findOnePresentacion(@Param('id') id: string) {
    return this.configProductService.findOnePresentacion(id);
  }

  @Patch('presentacion/:id')
  updatePresentacion(
    @Param('id') id: string,
    @Body() updatePresentacionDto: UpdatePresentacionDto,
  ) {
    return this.configProductService.updatePresentacion(id, updatePresentacionDto);
  }

  @Delete('presentacion/:id')
  removePresentacion(@Param('id') id: string) {
    return this.configProductService.removePresentacion(id);
  }
}
