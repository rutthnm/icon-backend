import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from './venta.entity';

@Entity({ name: 'detalle_venta' })
export class detalleVenta {
  @PrimaryGeneratedColumn('uuid')
  idDetalleVenta: string;

  @Column('text')
  idProducto: string;

  @Column('decimal', { precision: 4, scale: 2, nullable: true })
  alturaM: number;

  @Column('decimal', { precision: 4, scale: 2, nullable: true })
  baseM: number;

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 7, scale: 2 })
  precioTotal: number;

  @OneToOne(() => Venta, (venta) => venta.datelleVenta)
  @JoinColumn({name: 'idVenta'})
  venta: Venta;

  @Column('boolean', { default: true })
  estado: boolean;
}
