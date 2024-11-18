import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  idVenta: string;

  @Column('text')
  idPersona: string;

  @Column('time', { default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column('decimal', { precision: 7, scale: 2 })
  subTotal: number;

  @Column('decimal', { precision: 7, scale: 2 })
  igv: number;

  @Column('text')
  tipoPago: string;

  @Column('text')
  idUsuario: string;
}
