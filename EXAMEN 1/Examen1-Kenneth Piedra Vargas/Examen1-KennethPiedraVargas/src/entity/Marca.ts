import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehiculo } from "./Vehiculo"; //Importación de todas la librerias
import { IsNotEmpty } from "class-validator";

@Entity()
//Creación de la entidad Marca
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;
  //Creación de demas columnas de la entidas Marca con sus restricciónes
  @Column({ type: "varchar", length: 20, nullable: false })
  @IsNotEmpty({ message: "El nombre de la marca es requerido" })
  nombre: string;

  @Column({ type: "boolean", nullable: false })
  @IsNotEmpty({ message: "La metalización de la marca es requerido" })
  metalizado: boolean;

  @Column({ type: "boolean", nullable: false })
  @IsNotEmpty({ message: "El estado de la marca es requerido" })
  estado: boolean;

  @OneToMany(() => Vehiculo, (Vehiculo) => Vehiculo.marca)
  vehiculo: Marca[];
}
