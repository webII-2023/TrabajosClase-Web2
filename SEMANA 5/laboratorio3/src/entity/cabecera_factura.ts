import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { proveedor } from "./proveedor";
import { cliente } from "./cliente";
import { vendedor } from "./vendedor";

@Entity()
export class cabecera_factura {
  @PrimaryColumn({ type: "int", unique: true })
  Numero: number;

  @Column({ type: "date", nullable: true })
  Fecha: Date;

  @ManyToOne(() => cliente, (cliente) => cliente.Ruc_cliente)
  @JoinColumn({ name: "Ruc_Cliente" })
  Ruc_cliente: cliente;

  @ManyToOne(() => vendedor, (vendedor) => vendedor.Celular_vendedor)
  @JoinColumn({ name: " Codigo_vendedor" })
  vendedor: vendedor;
}
