import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity({ name: 'material' })
export class Material {
  @PrimaryGeneratedColumn('uuid')
  idMaterial: string;

  @OneToMany(() => Producto, (producto) => producto.idMaterial)
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
