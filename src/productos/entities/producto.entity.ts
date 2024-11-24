import { Categoria } from 'src/config-product/entities/categoria.entity';
import { Material } from 'src/config-product/entities/material.entity';
import { Presentacion } from 'src/config-product/entities/presentacion.entity';
import { Column, Entity, PrimaryGeneratedColumn,  ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'producto' })
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  idProducto: string;

  
  @ManyToOne(() => Categoria, (categoria) => categoria.idCategoria, { eager: true })
  @JoinColumn({ name: 'idCategoria' })
  idCategoria: Categoria;

  @ManyToOne(() => Presentacion, (presentacion) => presentacion.idPresentacion, { eager: true })
  @JoinColumn({ name: 'idPresentacion' })
  idPresentacion: Presentacion;

  @ManyToOne(() => Material, (material) => material.idMaterial, { eager: true })
  @JoinColumn({ name: 'idMaterial' })
  idMaterial: Material;

  

  @Column('text')
  nombre: string;

  @Column('text')
  descripcion: string;

 

  @Column('text')
  imagen: string;

  @Column('decimal', { precision: 7, scale: 2 })
  precio: number;

  @Column('boolean', { default: true })
  estado: boolean;
}
