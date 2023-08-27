import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class Usuarios {
  @PrimaryColumn()
  @IsNotEmpty({ message: "La cedula es requerida" })
  cedula: string;

  @Column({ length: 50 })
  @MaxLength(50)
  @IsNotEmpty({ message: "El nombre es requerida" })
  nombre: string;

  @Column()
  @MaxLength(50)
  @IsNotEmpty({ message: "El apellido 1 es requerida" })
  apellido1: string;

  @Column()
  @MaxLength(50)
  @IsNotEmpty({ message: "El apellido 2 es requerida" })
  apellido2: string;

  @Column()
  fecha_ingreso: Date;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty({ message: "El correo es requerido" })
  @MaxLength(50)
  correo: string;

  @Column()
  @IsNotEmpty({ message: "El rol del usuario es requerido" })
  rol: string;

  @Column()
  @MaxLength(30)
  @MinLength(5)
  @IsNotEmpty({ message: "La contrasehna es requerida" })
  contrasena: string;

  @Column({ default: true })
  estado: boolean;

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.contrasena = bcrypt.hashSync(this.contrasena, salt);
  }

  checkPassword(contra: string): boolean {
    return bcrypt.compareSync(contra, this.contrasena);
  }
}
