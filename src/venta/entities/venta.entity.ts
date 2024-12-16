import { Persona } from 'src/personas/entities/persona.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { detalleVenta } from './detalleventa.entity';
import { Comprobante } from './comprobante.entity';

@Entity({ name: 'venta' })
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  idVenta: string;

  @Column('text')
  idPersona: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column('decimal', { precision: 7, scale: 2 })
  subTotal: number;

  @Column('decimal', { precision: 7, scale: 2 })
  igv: number;

  @Column('text')
  tipoPago: string;

  
  @OneToOne(() => detalleVenta, (detalle_venta) => detalle_venta.idDetalleVenta)
  datelleVenta: detalleVenta;

  
  @OneToOne(() => Comprobante, (comprobante) => comprobante.idComprobante)
  comprobante: Comprobante;
  
  @ManyToOne(() => Usuario, (usuario) => usuario.venta, { eager: true })
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @ManyToOne(() => Persona, (persona) => persona.venta, { eager: true })
  @JoinColumn({ name: 'idPersona' })
  persona: Persona;

  @Column('boolean', { default: true })
  estado: boolean;
}
