import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'producto' })
export class Productos {
  @PrimaryGeneratedColumn('uuid')
  idProduto: string;

  @Column('text')
  idCategoria: string;

  @Column('text')
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('text')
  idMaterial: string;

  @Column('text')
  idPresentacion: string;

  @Column('text')
  imagen: string;

  @Column('decimal', { precision: 7, scale: 2 })
  precio: number;

  @Column('boolean', { default: true })
  estado: boolean;
}
