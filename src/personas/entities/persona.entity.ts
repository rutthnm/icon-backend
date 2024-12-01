import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

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

  @OneToOne(() => Usuario, (usuario) => usuario.idUsuario)
  usuario: Usuario;

  @Column('boolean', { default: true })
  estado: boolean;
}
