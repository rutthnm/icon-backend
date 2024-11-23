import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'presentacion' })
export class Presentacion {
  @PrimaryGeneratedColumn('uuid')
  idPresentacion: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('boolean')
  estado: boolean;
}
