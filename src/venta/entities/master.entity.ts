import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'master' })
export class Master {
  @PrimaryGeneratedColumn('uuid')
  idMaster: string;

  @Column('text')
  serie: string;

  @Column('int')
  numeracion: number;
}
