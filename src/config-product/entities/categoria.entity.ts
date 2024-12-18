import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity({ name: 'categoria' })
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  idCategoria: string;

  @OneToMany(() => Producto, (producto) => producto.idCategoria)
  productos: Producto[];

  @Column('text', { unique: true })
  nombre: string;

  @Column('boolean', { default: true })
  estado: boolean;

  @BeforeInsert()
  verificarNombre() {
    this.nombre = this.nombre.toUpperCase();
  }

  @BeforeUpdate()
  verificarNombreActualizar() {
    this.verificarNombre();
  }
}
