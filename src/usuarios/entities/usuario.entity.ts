import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text')
  idPersona: string;

  @Column('boolean', { default: true })
  estado: boolean;
}
