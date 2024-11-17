import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class detalleVenta {
  @PrimaryGeneratedColumn('uuid')
  idDetalleVenta: string;

  @Column('text')
  idProducto: string;

  @Column('decimal', { precision: 4, scale: 2 })
  alturaM: number;

  @Column('decimal', { precision: 4, scale: 2 })
  baseM: number;

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 7, scale: 2 })
  precioTotal: number;

  @Column('text')
  idVenta: string;
}
