import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'material' })
export class Material {
  @PrimaryGeneratedColumn('uuid')
  idMaterial: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('boolean')
  estado: boolean;
}
