import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cliente } from "./entity/Cliente";
import { Vendedor } from "./entity/Vendedor";
import { Proveedor } from "./entity/Proveedor";
import { Producto } from "./entity/Producto";
import { Cabecera_factura } from "./entity/Cabecera_factura";
import { Detalle_Factura } from "./entity/DetalleFactura";

//import { User } from "./entity/User"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "laboratorio3",
  synchronize: true,
  logging: false,
  entities: [
    Vendedor,
    Cliente,
    Proveedor,
    Producto,
    Cabecera_factura,
    Detalle_Factura,
  ],
  migrations: [],
  subscribers: [],
});
