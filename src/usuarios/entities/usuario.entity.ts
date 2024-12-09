import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from 'src/personas/entities/persona.entity';

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

  @Column('boolean', { default: true })
  estado: boolean;
}
