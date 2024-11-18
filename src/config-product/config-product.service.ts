import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createCategoria(createCategoriaDto: CreateCategoriaDto) {
    const newCategoria = this.categoriaRepository.create(createCategoriaDto);
    await this.categoriaRepository.save(newCategoria);
    return { message: 'categoria creada  con exito ', producto: newCategoria };
  }
  
  //listar todas las categorias de un producto
  async findAllCategoria() {
    return await this.categoriaRepository.find();
  }

  //obtener una categoria  por id 
   async findOneCategoria(id: string) {
    const producto = await this.categoriaRepository.findOne({ where: { idCategoria: id } });

    if (!producto) {
      throw new NotFoundException(`categoria  con id ${id} no encontrada`);
    }

    return producto;
  }

   async updateCategoria(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.preload({
      idCategoria: id, // Usamos 'idProduto' para encontrar el producto
      ...updateCategoriaDto, // Asignamos los valores que queremos actualizar
    });

    if (!categoria) {
      throw new NotFoundException(` categoria con id ${id} no encontrado`);
    }

    await this.categoriaRepository.save(categoria); 
    return { message: 'categoria  actualizada exitosamente', categoria };
  }

  // Soft delete: Actualiza estado a false
   async removeCategoria(id: string) {
  
    const categoria = await this.categoriaRepository.findOne({ where: { idCategoria: id } });

    if (!categoria) {
      throw new NotFoundException(`categoria  con id ${id} no encontrada`);
    }

    // Cambiar el estado de la categoria false en lugar de eliminarlo
    categoria.estado = false;
    await this.categoriaRepository.save(categoria); 
    return { message: 'categoria eliminada exitosamente', categoria };
  }






  // MATERIAL

   async createMaterial(createMaterialDto: CreateMaterialDto) {
    const newMaterial = this.materialRepository.create(createMaterialDto);
    await this.materialRepository.save(newMaterial);
    return { message: 'material  creado   con exito ', material: newMaterial };
  }

  findAllMaterial() {
    return this.materialRepository.find();
  }

   async findOneMaterial(id: string) {
    const material = await this.materialRepository.findOne({ where: { idMaterial: id } });

    if (!material) {
      throw new NotFoundException(`material  con id ${id} no encontrado`);
    }

    return material;
  }

   async updateMaterial(id: string, updateMaterialDto: UpdateMaterialDto) {
    const material = await this.materialRepository.preload({
      idMaterial: id, // Usamos 'idProduto' para encontrar el producto
      ...updateMaterialDto, // Asignamos los valores que queremos actualizar
    });

    if (!material) {
      throw new NotFoundException(` material  con id ${id} no encontrado`);
    }

    await this.materialRepository.save(material); 
    return { message: 'material actualizado exitosamente', material };
  }

  // Soft delete: Actualiza estado a false
   async removeMaterial(id: string) {
    const material = await this.materialRepository.findOne({ where: { idMaterial: id } });

    if (!material) {
      throw new NotFoundException(`material  con id ${id} no encontrado`);
    }

    // Cambiar el estado de la categoria false en lugar de eliminarlo
    material.estado = false;
    await this.materialRepository.save(material); 
    return { message: 'material  eliminada exitosamente', material };;
  }

  // PRESENTACION

   async createPresentacion(createPresentacionDto: CreatePresentacionDto) {
    const newPresentacion = this.presentacionRepository.create(createPresentacionDto);
    await this.presentacionRepository.save(newPresentacion);
    return { message: 'Presentancion   creada   con exito ', presentacion: newPresentacion };
  }

  findAllPresentacion() {
    return this.presentacionRepository.find();
  }

   async findOnePresentacion(id: string) {
    const presentacion = await this.presentacionRepository.findOne({ where: { idPresentacion: id } });

    if (!presentacion) {
      throw new NotFoundException(`presentacion  con id ${id} no encontrada`);
    }

    return presentacion;
  }



    async updatePresentacion(id: string, updatePresentacionDto: UpdatePresentacionDto) {
    const presentacion = await this.presentacionRepository.preload({
      idPresentacion: id, // Usamos 'idProduto' para encontrar el producto
      ...updatePresentacionDto, // Asignamos los valores que queremos actualizar
    });

    if (!presentacion) {
      throw new NotFoundException(` presentacion  con id ${id} no encontrada`);
    }

    await this.presentacionRepository.save(presentacion); 
    return { message: ' presentacion  actualizada exitosamente', presentacion };
  }

  
   async removePresentacion(id: string) {
    const  presentacion = await this.presentacionRepository.findOne({ where: { idPresentacion: id } });

    if (!presentacion) {
      throw new NotFoundException(`presentacion  con id ${id} no encontrada`);
    }

    
    presentacion.estado = false;
    await this.presentacionRepository.save(presentacion); 
    return { message: 'presentacion  eliminada exitosamente', presentacion };;
  }
}
