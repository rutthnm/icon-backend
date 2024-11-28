import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'persona' })
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  idPersona: string;

  @Column('text', { nullable: false }) // Cambiar a false si NO deben permitir valores nulos
  nombres: string;

  @Column('text', { nullable: false }) // Cambiar a false si NO deben permitir valores nulos
  apellidos: string;

  @Column('text', { nullable: false }) // Cambiar a false si NO deben permitir valores nulos
  documento: string;

  @Column('text', { unique: true })
  nDocumento: string;

  @Column('text')
  telefono: string;

  @Column('boolean', { default: true })
  estado: boolean;
}
