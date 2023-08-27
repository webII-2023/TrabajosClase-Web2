import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  @IsNotEmpty({ message: "El nombre de la marca es requerido" })
  nombre: string;

  @Column({ type: "boolean", nullable: true })
  @IsNotEmpty({ message: "La metalización de la marca es requerido" })
  metalizado: boolean;

  @Column({ type: "boolean", nullable: true })
  @IsNotEmpty({ message: "El estado de la marca es requerido" })
  estado: boolean;

  @OneToMany(() => Vehiculo, (Vehiculo) => Vehiculo.marca)
  vehiculo: Marca[];
}
