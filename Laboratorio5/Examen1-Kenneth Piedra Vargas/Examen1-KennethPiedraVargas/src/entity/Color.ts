import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Color {
  @PrimaryColumn({ type: "int", unique: true })
  @IsNotEmpty({ message: "La identificación del color es requerido" })
  id: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  @IsNotEmpty({ message: "El nombre del color es requerido" })
  nombre: string;

  @Column({ type: "boolean", nullable: true })
  @IsNotEmpty({ message: "El estado del color es requerido" })
  estado: boolean;

  @OneToMany(() => Vehiculo, (Vehiculo) => Vehiculo.colors)
  vehiculo: Color[];
}
