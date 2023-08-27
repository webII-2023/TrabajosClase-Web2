import { Router } from "express";
import facturaController from "../../controller/facturaController";

const routes = Router();
routes.get("/:id", facturaController.getById);
routes.get("", facturaController.getAll);
routes.patch("/:id", facturaController.update);

export default routes;
