import { Router } from "express";
import productoController from "../../controller/productoController";

const routes = Router();

routes.get("/:id", productoController.getById);
routes.get("", productoController.getAll);
routes.post("", productoController.add);
routes.delete("/:id", productoController.delete);
routes.patch("/:id", productoController.update);

export default routes;
