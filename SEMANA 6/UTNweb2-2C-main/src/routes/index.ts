import { Router } from "express";
import producto from "./productos";
import auth from "./auth";
import usuarios from "./usuarios";
import { checkjwt } from "../middleware/jwt";
import { Factura } from "../entity/factura";
import factura from "./factura";
const routes = Router();

routes.use("/productos", producto);
routes.use("/auth", auth);
routes.use("/usuarios", usuarios);
routes.use("/factura", factura);

export default routes;
