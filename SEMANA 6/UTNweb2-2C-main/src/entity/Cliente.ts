import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Persona } from "./persona";
import { TipoCliente } from "./TipoCliente";
import { Factura } from "./factura";

@Entity()
export class Cliente {
  @PrimaryColumn()
  cedula: string;

  @ManyToOne(() => TipoCliente, (tipoCliente) => tipoCliente.clientes)
  tipoCliente: TipoCliente;

  @Column()
  fechaIngreso: Date;

  @OneToOne(() => Persona, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "cedula" })
  persona: Persona;

  @OneToMany(() => Factura, (Factura) => Factura.cliente)
  facturas: Factura[];
}
//unidirecional
//bidireccional join en los 2 lados.
