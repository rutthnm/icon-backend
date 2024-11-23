import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria' })
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  idCategoria: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('boolean')
  estado: boolean;
}
