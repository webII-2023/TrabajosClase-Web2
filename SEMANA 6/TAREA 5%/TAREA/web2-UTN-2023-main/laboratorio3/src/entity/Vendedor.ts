import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Vendedor {
  @PrimaryColumn({ type: "int", unique: true })
  Codigo_vendedor: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  Nombres_vendedor: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  Apellidos_vendedor: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  Direccion_vendedor: string;

  @Column({ type: "int", nullable: true })
  Telefono_vendedor: number;

  @Column({ type: "int", nullable: true })
  Celular_vendedor: number;
}
