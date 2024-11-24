import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';

import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from 'src/config-product/entities/categoria.entity';
import { Material } from 'src/config-product/entities/material.entity';
import { Presentacion } from 'src/config-product/entities/presentacion.entity';
import { CreateProductoDto } from './dto/create-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}


  async create(createProductoDto: CreateProductoDto) {
  
    const categoria = await this.productoRepository.manager.findOne(Categoria, {
      where: { idCategoria: createProductoDto.idCategoria },
    });
  
    const material = await this.productoRepository.manager.findOne(Material, {
      where: { idMaterial: createProductoDto.idMaterial },
    });
  
    const presentacion = await this.productoRepository.manager.findOne(Presentacion, {
      where: { idPresentacion: createProductoDto.idPresentacion },
    });
  

    if (!categoria || !material || !presentacion) {
      throw new Error('Una o más relaciones no fueron encontradas.');
    }
  

    const newProducto = this.productoRepository.create({
      ...createProductoDto,  // Los demás datos del DTO
      idCategoria: categoria,  // Relacionar la categoría completa
      idMaterial: material,    // Relacionar el material completo
      idPresentacion: presentacion,  // Relacionar la presentación completa
    });
  
    // Guardar el nuevo producto
    return this.productoRepository.save(newProducto);
  }
  

  findAll() {
    return this.productoRepository.find({
      where: {
        estado: true,
      },
    });
  }

  findOne(id: string) {
    return this.productoRepository.findOne({
      where: {
        idProducto: id,
      },
    });
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    
    const categoria = await this.productoRepository.manager.findOne(Categoria, {
      where: { idCategoria: updateProductoDto.idCategoria },
    });
  
    const material = await this.productoRepository.manager.findOne(Material, {
      where: { idMaterial: updateProductoDto.idMaterial },
    });
  
    const presentacion = await this.productoRepository.manager.findOne(Presentacion, {
      where: { idPresentacion: updateProductoDto.idPresentacion },
    });
  
    
    if (!categoria || !material || !presentacion) {
      throw new Error('Una o más relaciones no fueron encontradas.');
    }
  
    const producto = await this.productoRepository.preload({
      idProducto: id,
      ...updateProductoDto,  // Desestructurar el DTO de actualización
      idCategoria: categoria,  // Relacionar la categoría completa
      idMaterial: material,    // Relacionar el material completo
      idPresentacion: presentacion,  // Relacionar la presentación completa
    });
  

    if (!producto) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }
  

    return this.productoRepository.save(producto);
  }
  

  remove(id: string) {
    return this.productoRepository.update(id, { estado: false });
  }
  
}
