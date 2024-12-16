import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from './venta.entity';

@Entity({ name: 'comprobante' })
export class Comprobante {
  @PrimaryGeneratedColumn('uuid')
  idComprobante: string;

  @Column('text')
  serie: string; //B001 - F001

  @Column('int')
  numeracion: number;

  @Column('text')
  tipoComprobante: string;

  @Column('text')
  idVenta: string;

  @OneToOne(() => Venta, (venta) => venta.comprobante)
  @JoinColumn({name: 'idVenta'})
  venta: Venta;

  @Column('boolean', { default: true })
  estado: boolean;
}
