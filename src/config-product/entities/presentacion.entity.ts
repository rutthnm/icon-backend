import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Presentacion {
  @PrimaryGeneratedColumn('uuid')
  idPresentacion: string;

  @Column('text')
  nombre: string;

  @Column('boolean')
  estado: boolean;
}
