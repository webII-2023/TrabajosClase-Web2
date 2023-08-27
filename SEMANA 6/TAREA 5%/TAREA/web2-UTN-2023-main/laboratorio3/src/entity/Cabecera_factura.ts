import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Proveedor } from "./Proveedor";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { Detalle_Factura } from "./DetalleFactura";

@Entity()
export class Cabecera_factura {
  @PrimaryColumn({ type: "int", unique: true })
  Numero: number;

  @Column({ type: "date", nullable: false })
  Fecha: Date;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Cliente, (cliente) => cliente.Cabecera_factura)
  @JoinColumn({ name: "Ruc_Cliente" })
  Ruc_cliente: Cliente;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.Codigo_vendedor)
  @JoinColumn({ name: " Codigo_vendedor" })
  vendedor: Vendedor;

  @OneToMany(
    () => Detalle_Factura,
    (Detalle_Factura) => Detalle_Factura.Cabecera_factura
  )
  Detalle_Factura: Detalle_Factura[];
}
