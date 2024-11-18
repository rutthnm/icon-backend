import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  idUsuario: string;

  @Column('text')
  correo: string;

  @Column('text')
  contrasena: string;

  @Column('text')
  rol: string;

  @Column('text')
  idPersona: string;

  @Column('boolean', { default: true })
  estado: boolean;
}

