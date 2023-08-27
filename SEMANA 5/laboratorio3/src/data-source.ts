import "reflect-metadata";
import { DataSource } from "typeorm";
import { cliente } from "./entity/cliente";
import { vendedor } from "./entity/vendedor";
import { proveedor } from "./entity/proveedor";
import { producto } from "./entity/producto";
import { cabecera_factura } from "./entity/cabecera_factura";
import { Detalle_Factura } from "./entity/detalleFactura";

//import { User } from "./entity/User"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "labo3",
  synchronize: true,
  logging: false,
  entities: [
    vendedor,
    cliente,
    proveedor,
    producto,
    cabecera_factura,
    Detalle_Factura,
  ],
  migrations: [],
  subscribers: [],
});
