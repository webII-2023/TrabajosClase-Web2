import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Tipo_Vehiculo {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "La identificación es requeridad" })
  id: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  @IsNotEmpty({ message: "El nombre del tipo de vehiculo es requerido" })
  nombre: string;

  @Column({ type: "boolean", nullable: true })
  @IsNotEmpty({ message: "El estado del tipo de vehiculo es requerido" })
  estado: boolean;

  @OneToMany(() => Vehiculo, (Vehiculo) => Vehiculo.tipoVehiculos)
  vehiculo: Tipo_Vehiculo[];
}
