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

  // CATEGORIA

  createCategoria(createCategoriaDto: CreateCategoriaDto) {
    const newCategoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(newCategoria);
  }

  findAllCategoria() {
    return this.categoriaRepository.find({
      where: {
        estado: true,
      },
      select: ['idCategoria', 'nombre']
    });
  }

  findOneCategoria(id: string) {
    return this.categoriaRepository.findOne({
      where: { idCategoria: id },
    });
  }

  updateCategoria(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaRepository.update(id, updateCategoriaDto);
  }

  // Soft delete: Actualiza estado a false
  removeCategoria(id: string) {
    return this.categoriaRepository.update(id, { estado: false });
  }

  // MATERIAL

  createMaterial(createMaterialDto: CreateMaterialDto) {
    const newMaterial = this.materialRepository.create(createMaterialDto);
    return this.materialRepository.save(newMaterial);
  }

  findAllMaterial() {
    return this.materialRepository.find({
      where: {
        estado: true,
      },
      select: ['idMaterial', 'nombre']
    });
  }

  findOneMaterial(id: string) {
    return this.materialRepository.findOne({
      where: { idMaterial: id },
    });
  }

  updateMaterial(id: string, updateMaterialDto: UpdateMaterialDto) {
    return this.materialRepository.update(id, updateMaterialDto);
  }

  // Soft delete: Actualiza estado a false
  removeMaterial(id: string) {
    return this.materialRepository.update(id, { estado: false });
  }

  // PRESENTACION

  createPresentacion(createPresentacionDto: CreatePresentacionDto) {
    const newPresentacion = this.presentacionRepository.create(
      createPresentacionDto,
    );
    return this.presentacionRepository.save(newPresentacion);
  }

  findAllPresentacion() {
    return this.presentacionRepository.find({
      where: {
        estado: true,
      },
      select: ['idPresentacion', 'nombre']
    });
  }

  findOnePresentacion(id: string) {
    return this.presentacionRepository.findOne({
      where: { idPresentacion: id },
    });
  }

  updatePresentacion(id: string, updatePresentacionDto: UpdatePresentacionDto) {
    return this.presentacionRepository.update(id, updatePresentacionDto);
  }

  // veriificar con paquito si solo desactiva el estado o quiere borrado :(
  removePresentacion(id: string) {
    return this.presentacionRepository.update(id, { estado: false });
  }
}
