import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto";
import { Cabecera_factura } from "./Cabecera_factura";

@Entity()
export class Detalle_Factura {
  @Column({ primary: true })
  Numero: number;

  @Column({ primary: true })
  idProducto: number;

  @ManyToOne(
    () => Cabecera_factura,
    (Cabecera_factura) => Cabecera_factura.Detalle_Factura
  )
  @JoinColumn({ name: "Numero" })
  Cabecera_factura: Cabecera_factura;

  @ManyToOne(() => Producto, (Producto) => Producto.Detalle_Factura)
  @JoinColumn({ name: "idProducto" })
  Producto: Producto;

  @Column({ type: "int", nullable: true })
  Cantidad: number;
}
