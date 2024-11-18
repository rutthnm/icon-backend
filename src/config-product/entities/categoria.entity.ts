import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  idCategoria: string;

  @Column('text')
  nombre: string;

  @Column('boolean')
  estado: boolean;
}
