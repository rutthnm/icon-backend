import { Producto } from 'src/productos/entities/producto.entity';
import { Column, Entity, PrimaryGeneratedColumn , OneToMany} from 'typeorm';


@Entity({ name: 'presentacion' })
export class Presentacion {
  @PrimaryGeneratedColumn('uuid')

  @OneToMany(() => Producto, (producto) => producto.idPresentacion)
  productos: Producto[];
  idPresentacion: string;

  @Column('text', { unique: true })
  nombre: string;

  @Column('boolean', {default: true})
  estado: boolean;
}
