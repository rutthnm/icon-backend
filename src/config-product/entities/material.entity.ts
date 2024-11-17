import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  idMaterial: string;

  @Column('text')
  nombre: string;

  @Column('boolean')
  estado: boolean;
}
