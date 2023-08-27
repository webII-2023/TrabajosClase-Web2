import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Color } from "./Color";
import { Marca } from "./Marca";
import { Tipo_Vehiculo } from "./Tipo_Vehiculo";
import { IsNotEmpty } from "class-validator";

@Entity()
//Creación de la clase vehiculo
export class Vehiculo {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: "La identificación del vehiculo es requerida" })
  id: number;
  //Creación de las columnas de en la base de datos
  @Column({ type: "varchar", unique: true, length: 40, nullable: false })
  @IsNotEmpty({ message: "La placa del vehiculo es requerido" })
  placa: string;

  @Column({ type: "int", nullable: false })
  @IsNotEmpty({ message: "El cilindraje del vehiculo es requerido" })
  cilindraje: number;

  @Column({ type: "date", nullable: false })
  @IsNotEmpty({ message: "La la fecha de ingreso del vehiculo es requerida" })
  fecha_ingreso: Date;

  @Column({ type: "boolean", nullable: false })
  @IsNotEmpty({
    message: "El estado del vehiculo es requerido (true or false)",
  })
  estado: boolean;
  //Relación de mucho a uno con la entidad marca
  @ManyToOne(() => Marca, (marca) => marca.vehiculo)
  @JoinColumn({ name: "id_marca" })
  marca: Marca;
  //Relación de mucho a uno con la entidad color
  @ManyToOne(() => Color, (color) => color.vehiculo)
  @JoinColumn({ name: "id_color" })
  colors: Color;
  //Relación de mucho a uno con la entidad tipo_vehiculo
  @ManyToOne(() => Tipo_Vehiculo, (TipoVehiculo) => TipoVehiculo.vehiculo)
  @JoinColumn({ name: "id_TipoVehiculo" })
  tipoVehiculos: Color;
}
