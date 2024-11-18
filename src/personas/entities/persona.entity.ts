import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  
export class Persona {
  @PrimaryGeneratedColumn('uuid')  
  id: string; 

  @Column('text')  
  nombres: string;

  @Column('text')  
  apellidos: string;

  @Column('text')  
  documento: string;

  @Column('text', {unique: true})  
  nDocumento: string;

  @Column('text')  
  telefono: string;

  @Column('boolean', { default: true })  
  estado: boolean;
}
