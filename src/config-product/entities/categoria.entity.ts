import { Producto } from 'src/productos/entities/producto.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'categoria' })
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  idCategoria: string;

  @OneToMany(() => Producto, (producto) => producto.idCategoria)
  productos: Producto[];

  @Column('text', { unique: true })
  nombre: string;

  @Column('boolean')
  estado: boolean;
}
