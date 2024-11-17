import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
}
