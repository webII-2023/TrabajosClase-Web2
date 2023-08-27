import { Router } from "express";
import Marca from "./Marca";
import Vehiculo from "./Vehiculo";

const routes = Router();
//crear las rutas de marca y vehiculos
routes.use("/marca", Marca);
routes.use("/vehiculo", Vehiculo);

export default routes;
