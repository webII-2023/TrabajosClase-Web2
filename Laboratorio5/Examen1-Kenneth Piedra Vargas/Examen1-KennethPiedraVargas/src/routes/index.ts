import { Router } from "express";
import Color from "./Color";
import Marca from "./Marca";
import Tipo_Vehiculo from "./Tipo_Vehiculo";
import Vehiculo from "./Vehiculo";

const routes = Router();

routes.use("/color", Color);
routes.use("/marca", Marca);
routes.use("/tipoVehiculo", Tipo_Vehiculo);
routes.use("/vehiculo", Vehiculo);

export default routes;
