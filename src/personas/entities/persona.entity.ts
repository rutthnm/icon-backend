import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  idPersona: string;

  @Column('text')
  nombres: string;

  @Column('text')
  apellidos: string;

  @Column('text')
  documento: string;

  @Column('text')
  nDocumento: string;

  @Column('text')
  telefono: string;

  @Column('boolean', { default: true })
  estado: boolean;
}
