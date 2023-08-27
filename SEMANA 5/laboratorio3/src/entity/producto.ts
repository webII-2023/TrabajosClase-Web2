import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToMany,
} from "typeorm";
import { proveedor } from "./proveedor";
import { cabecera_factura } from "./cabecera_factura";

@Entity()
export class producto {
  @PrimaryColumn({ type: "int", unique: true })
  Codigo_producto: number;

  @Column({ type: "varchar", length: 40, nullable: true })
  Descripcion_producto: string;

  @Column({ type: "int", nullable: true })
  Precio_producto: number;

  @Column({ type: "int", nullable: true })
  Stock_maximo_producto: number;

  @Column({ type: "int", nullable: true })
  Stock_minimo_producto: number;

  @OneToOne(() => proveedor)
  @JoinColumn({ name: "Codigo_proveedor" })
  proveedor: proveedor;

  @Column({ type: "boolean", nullable: true })
  Estado_producto: boolean;

  @ManyToMany(() => proveedor, (proveedor) => proveedor.Codigo_proveedor)
  cabeceras_factura: proveedor[];
}
