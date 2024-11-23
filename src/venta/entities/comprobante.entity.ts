import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('boolean', { default: true })
  estado: boolean;
}
