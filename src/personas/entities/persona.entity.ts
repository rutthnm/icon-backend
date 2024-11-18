import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  
export class Persona {
  @PrimaryGeneratedColumn('uuid')  
  id: string; 

  @Column()  
  nombres: string;

  @Column()  
  apellidos: string;

  @Column()  
  documento: string;

  @Column()  
  nDocumento: string;

  @Column()  
  telefono: string;

  @Column({ default: true })  
  estado: boolean;
}
