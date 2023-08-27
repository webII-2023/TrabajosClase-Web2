import { Router } from "express";
import clienteController from "../../controller/clienteController";

const routes=Router();

routes.get('', clienteController.getAll);
routes.post('',clienteController.add)
routes.get('/:id',clienteController.getById)
export default routes;