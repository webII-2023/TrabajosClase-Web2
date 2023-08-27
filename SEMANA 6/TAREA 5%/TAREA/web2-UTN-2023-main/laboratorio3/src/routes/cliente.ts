import { Router } from "express";
import clienteController from "../../controller/clienteController";

const routes = Router();

routes.get("", clienteController.getAll);
//routes.post('',clienteController.add)
routes.get("/:id", clienteController.getById);
routes.delete("/:id", clienteController.delete);
routes.post("", clienteController.add);
routes.patch("/:id", clienteController.update);

export default routes;
