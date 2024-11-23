import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'persona' })
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  idPersona: string;

  @Column('text')
  nombres: string;

  @Column('text')
  apellidos: string;

  @Column('text')
  documento: string;

  @Column('text', { unique: true })
  nDocumento: string;

  @Column('text')
  telefono: string;

  @Column('boolean', { default: true })
  estado: boolean;
}
