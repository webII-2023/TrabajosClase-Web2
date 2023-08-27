import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Proveedor } from "./Proveedor";
import { Cabecera_factura } from "./Cabecera_factura";
import { Detalle_Factura } from "./DetalleFactura";

@Entity()
export class Producto {
  @PrimaryColumn({ type: "int", unique: true })
  Codigo_producto: number;

  @Column({ type: "varchar", length: 40, nullable: false })
  Descripcion_producto: string;

  @Column({ type: "int", nullable: false })
  Precio_producto: number;

  @Column({ type: "int", nullable: false })
  Stock_maximo_producto: number;

  @Column({ type: "int", nullable: false })
  Stock_minimo_producto: number;

  @Column({ type: "boolean", nullable: true })
  Estado_producto: boolean;

  /* @ManyToMany(() => Proveedor, (proveedor) => proveedor.Codigo_proveedor)
  cabeceras_factura: Proveedor[];*/

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.producto)
  @JoinColumn({ name: "Codigo_proveedor" })
  proveedor: Proveedor;

  @OneToMany(
    () => Detalle_Factura,
    (Detalle_Factura) => Detalle_Factura.Producto
  )
  Detalle_Factura: Detalle_Factura[];
}
