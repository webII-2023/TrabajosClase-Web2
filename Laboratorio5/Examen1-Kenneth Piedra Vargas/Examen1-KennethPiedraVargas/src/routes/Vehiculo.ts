import { Router } from "express";
import vehiculoController from "../../controller/vehiculoController";

const routes = Router();
routes.get("/:id", vehiculoController.getByPlaca);
routes.delete("/:id", vehiculoController.deleteVehicle);
routes.post("", vehiculoController.addVehicle);

export default routes;
