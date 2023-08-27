import { IsEmail, IsNotEmpty, MaxLength, maxLength } from "class-validator";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Producto {
  @PrimaryColumn()
  id: number;
  @Column({ length: 5 })
  @MaxLength(5, { message: "Debe ser menos de 5 caracteres" })
  @IsNotEmpty()
  nombre: string;
  @Column()
  @IsNotEmpty({ message: "ddd" })
  precio: number;
  @Column()
  @IsNotEmpty()
  stock: number;
  @Column()
  fechaIngreso: Date;
  @Column()
  estado: boolean;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.producto)
  detallesFactura: DetalleFactura[];
}
