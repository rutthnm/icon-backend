import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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

  //CATEGORIA

  @Post()
  createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.configProductService.createCategoria(createCategoriaDto);
  }

  @Get()
  findAllCategoria() {
    return this.configProductService.findAllCategoria();
  }

  @Get(':id')
  findOneCategoria(@Param('id') id: string) {
    return this.configProductService.findOneCategoria(id);
  }

  @Patch(':id')
  updateCategoria(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.configProductService.updateCategoria(id, updateCategoriaDto);
  }

  @Delete(':id')
  removeCategoria(@Param('id') id: string) {
    return this.configProductService.removeCategoria(id);
  }

  //MATERIAL

  @Post()
  createMaterial(@Body() createMaterialDto: CreateMaterialDto) {
    return this.configProductService.createMaterial(createMaterialDto);
  }

  @Get()
  findAllMaterial() {
    return this.configProductService.findAllMaterial();
  }

  @Get(':id')
  findOneMaterial(@Param('id') id: string) {
    return this.configProductService.findOneMaterial(id);
  }

  @Patch(':id')
  updateMaterial(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.configProductService.updateMaterial(id, updateMaterialDto);
  }

  @Delete(':id')
  removeMaterial(@Param('id') id: string) {
    return this.configProductService.removeMaterial(id);
  }

  //PRESENTACION

  @Post()
  createPresentacion(@Body() createPresentacionDto: CreatePresentacionDto) {
    return this.configProductService.createPresentacion(createPresentacionDto);
  }

  @Get()
  findAllPresentacion() {
    return this.configProductService.findAllPresentacion();
  }

  @Get(':id')
  findOnePresentacion(@Param('id') id: string) {
    return this.configProductService.findOnePresentacion(id);
  }

  @Patch(':id')
  updatePresentacion(
    @Param('id') id: string,
    @Body() updatePresentacionDto: UpdatePresentacionDto,
  ) {
    return this.configProductService.updatePresentacion(
      id,
      updatePresentacionDto,
    );
  }

  @Delete(':id')
  removePresentacion(@Param('id') id: string) {
    return this.configProductService.removePresentacion(id);
  }
}
