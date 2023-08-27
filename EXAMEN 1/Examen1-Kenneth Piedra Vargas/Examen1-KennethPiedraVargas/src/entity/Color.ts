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

//Creación de la entidad color
export class Color {
  //Llave primaria
  @PrimaryColumn({ type: "int", unique: true })
  @IsNotEmpty({ message: "La identificación del color es requerido" })
  id: number;
  //demas columnas con sus tipos y restricciónes
  @Column({ type: "varchar", length: 20, nullable: false })
  @IsNotEmpty({ message: "El nombre del color es requerido" })
  nombre: string;

  @Column({ type: "boolean", nullable: false })
  @IsNotEmpty({ message: "El estado del color es requerido" })
  estado: boolean;

  @OneToMany(() => Vehiculo, (Vehiculo) => Vehiculo.colors)
  vehiculo: Color[];
}
