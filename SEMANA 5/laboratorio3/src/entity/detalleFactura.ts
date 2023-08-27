import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { producto } from "./producto";
import { cabecera_factura } from "../entity/cabecera_factura";

@Entity()
export class Detalle_Factura {
  @PrimaryColumn()
  @ManyToOne(
    () => cabecera_factura,
    (cabecera_factura) => cabecera_factura.Numero
  )
  @JoinColumn({ name: "Numero" })
  Numero: number;

  @Column({ type: "int", nullable: true })
  Cantidad: number;

  @ManyToOne(() => producto, (producto) => producto.Codigo_producto)
  @JoinColumn({ name: "Codigo_Productos" })
  producto: producto;
}
