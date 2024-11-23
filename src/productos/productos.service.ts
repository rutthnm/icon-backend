import { Injectable } from '@nestjs/common';
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
        idProduto: id,
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
