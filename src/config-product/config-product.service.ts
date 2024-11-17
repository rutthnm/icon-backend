import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { Presentacion } from './entities/presentacion.entity';
import {
  CreateCategoriaDto,
  CreateMaterialDto,
  CreatePresentacionDto,
  UpdateCategoriaDto,
  UpdateMaterialDto,
  UpdatePresentacionDto,
} from './dto';

@Injectable()
export class ConfigProductService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Presentacion)
    private readonly presentacionRepository: Repository<Presentacion>,
  ) {}

  //CATEGORIA

  createCategoria(createConfigProductDto: CreateCategoriaDto) {
    const newCategoria = this.categoriaRepository.create(
      createConfigProductDto,
    );
    return this.categoriaRepository.save(newCategoria);
  }

  findAllCategoria() {
    return this.categoriaRepository.find();
  }

  findOneCategoria(id: string) {
    return this.categoriaRepository.findOne({
      where: {
        idCategoria: id,
      },
    });
  }

  updateCategoria(id: string, updateConfigProductDto: UpdateCategoriaDto) {
    return this.categoriaRepository.update(id, updateConfigProductDto);
  }

  removeCategoria(id: string) {
    return this.categoriaRepository.update(id, { estado: false });
  }

  //MATERIAL

  createMaterial(createMaterialDto: CreateMaterialDto) {
    const newMaterial = this.materialRepository.create(createMaterialDto);
    return this.materialRepository.save(newMaterial);
  }

  findAllMaterial() {
    return this.materialRepository.find();
  }

  findOneMaterial(id: string) {
    return this.materialRepository.findOne({
      where: {
        idMaterial: id,
      },
    });
  }

  updateMaterial(id: string, updateMaterialDto: UpdateMaterialDto) {
    return this.materialRepository.update(id, updateMaterialDto);
  }

  removeMaterial(id: string) {
    return this.materialRepository.update(id, { estado: false });
  }

  //PRESENTACION

  createPresentacion(createPresentacionDto: CreatePresentacionDto) {
    const newPresentacion = this.materialRepository.create(
      createPresentacionDto,
    );
    return this.presentacionRepository.save(newPresentacion);
  }

  findAllPresentacion() {
    return this.presentacionRepository.find();
  }

  findOnePresentacion(id: string) {
    return this.presentacionRepository.findOne({
      where: {
        idPresentacion: id,
      },
    });
  }

  updatePresentacion(id: string, updatePresentacionDto: UpdatePresentacionDto) {
    return this.presentacionRepository.update(id, updatePresentacionDto);
  }

  removePresentacion(id: string) {
    return this.presentacionRepository.update(id, { estado: false });
  }
}
