import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class Proveedor {
  @PrimaryColumn({ type: "int", unique: true })
  Codigo_proveedor: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  Apellido_proveedor: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  Direccion_proveedor: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  Provincia_proveedor: string;

  @Column({ type: "int", nullable: true })
  Telefono_proveedor: number;

  @OneToMany(() => Producto, (producto) => producto.Codigo_producto)
  producto: Producto[];
}
