import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  create(createProductoDto: CreateProductoDto) {
    const newProducto = this.productoRepository.create(createProductoDto);

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

  update(id: string, updateProductoDto: UpdateProductoDto) {
    return this.productoRepository.update(id, updateProductoDto);
  }

  remove(id: string) {
    return this.productoRepository.update(id, { estado: false });
  }
}
