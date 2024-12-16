import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from 'src/personas/entities/persona.entity';
import { Venta } from 'src/venta/entities/venta.entity';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  idUsuario: string;

  @Column('text', { unique: true })
  correo: string;

  @Column('text')
  contrasena: string;

  @Column('text')
  rol: string;

  @OneToOne(() => Persona, (persona) => persona.usuario, { cascade: true })
  @JoinColumn({ name: 'idPersona' })
  persona: Persona;

  @OneToMany(() => Venta, (venta) => venta.idVenta)
  venta: Venta[];

  @Column('boolean', { default: true })
  estado: boolean;
}
