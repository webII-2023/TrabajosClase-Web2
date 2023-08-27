import { Router } from "express";
import facturaController from "../../controller/facturaController";

const routes = Router();
routes.get("", facturaController.getAll);
routes.get("/:Numero", facturaController.getById);
routes.post("", facturaController.add);
routes.delete("/:Numero", facturaController.deleteLogico);
//routes.delete("/:Numero", facturaController.deleteDetalle);
routes.patch("/:Numero", facturaController.update);

export default routes;
