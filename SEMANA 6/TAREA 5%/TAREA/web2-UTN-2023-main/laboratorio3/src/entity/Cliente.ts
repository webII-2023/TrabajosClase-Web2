import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Cabecera_factura } from "./Cabecera_factura";

@Entity()
export class Cliente {
  @PrimaryColumn({ type: "int", unique: true })
  Ruc_cliente: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  Nombres_cliente: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  Apellidos_cliente: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  Direccion_cliente: string;

  @Column({ type: "int", nullable: false })
  Telefono_cliente: number;

  @Column({ type: "boolean", nullable: false })
  Estado: boolean;

  @OneToMany(
    () => Cabecera_factura,
    (Cabecera_factura) => Cabecera_factura.Ruc_cliente
  )
  Cabecera_factura: Cabecera_factura[];
}
