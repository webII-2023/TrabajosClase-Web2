import "reflect-metadata";
import { DataSource } from "typeorm";
import { Producto } from "./entity/Producto";
import { Usuarios } from "./entity/Usuario";
import { Cliente } from "./entity/cliente";
import { Persona } from "./entity/persona";
import { TipoCliente } from "./entity/TipoCliente";
import { DetalleFactura } from "./entity/DetalleFactura";
import { Factura } from "./entity/factura";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "prueba_utn",
  synchronize: true,
  logging: false,
  entities: [
    Producto,
    Usuarios,
    Persona,
    Cliente,
    TipoCliente,
    DetalleFactura,
    Factura,
  ],
  migrations: [],
  subscribers: [],
});
