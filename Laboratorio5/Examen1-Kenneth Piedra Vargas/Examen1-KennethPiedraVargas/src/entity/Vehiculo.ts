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

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true, length: 40, nullable: true })
  placa: string;

  @Column({ type: "int", nullable: true })
  cilindraje: number;

  @Column({ type: "date", nullable: true })
  fecha_ingreso: Date;

  @Column({ type: "boolean", nullable: true })
  estado: boolean;

  @ManyToOne(() => Marca, (marca) => marca.vehiculo)
  @JoinColumn({ name: "id_marca" })
  marca: Marca;

  @ManyToOne(() => Color, (color) => color.vehiculo)
  @JoinColumn({ name: "id_color" })
  colors: Color;

  @ManyToOne(() => Tipo_Vehiculo, (TipoVehiculo) => TipoVehiculo.vehiculo)
  @JoinColumn({ name: "id_TipoVehiculo" })
  tipoVehiculos: Color;
}
