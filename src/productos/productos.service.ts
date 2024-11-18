import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly productoRepository: Repository<Productos>,
  ) {}

  
  async create(createProductoDto: CreateProductoDto) {
    const newProducto = this.productoRepository.create(createProductoDto);
    await this.productoRepository.save(newProducto);
    return { message: 'Producto creado exitosamente', producto: newProducto };
  }

 
  async findAll() {
    return await this.productoRepository.find();
  }

 
  async findOne(id: string) {
    const producto = await this.productoRepository.findOne({ where: { idProduto: id } });

    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return producto;
  }

  
  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.preload({
      idProduto: id, // Usamos 'idProduto' para encontrar el producto
      ...updateProductoDto, // Asignamos los valores que queremos actualizar
    });

    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    await this.productoRepository.save(producto); 
    return { message: 'Producto actualizado exitosamente', producto };
  }

  
  async remove(id: string) {
    const producto = await this.productoRepository.findOne({ where: { idProduto: id } });

    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    // Cambiar el estado del producto a false en lugar de eliminarlo
    producto.estado = false;
    await this.productoRepository.save(producto);
    return { message: 'Producto eliminado exitosamente', producto };
  }
}