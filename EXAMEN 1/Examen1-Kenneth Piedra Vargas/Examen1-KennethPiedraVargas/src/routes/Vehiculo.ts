import { Router } from "express";
import vehiculoController from "../../controller/vehiculoController";
import { checkjwt } from "../../middleware/jws";
import { checkRoles } from "../../middleware/roles";

const routes = Router();

/*routes.get(
    "",
    checkjwt,
    checkRoles(["admin", "user"]),
    vehiculoController.addVehicle
  );*/
//Llamar los metodos para verificarlos

routes.get("/:id", vehiculoController.getByPlaca);
routes.delete("/:id", vehiculoController.deleteVehicle);
routes.post("", vehiculoController.addVehicle);

export default routes;
