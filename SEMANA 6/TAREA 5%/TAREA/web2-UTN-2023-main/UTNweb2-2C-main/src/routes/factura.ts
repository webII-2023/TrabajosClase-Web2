import { Router } from "express";
import FacturaController from "../controller/facturaController";

const routes = Router();

routes.get("", FacturaController.getAll);

export default routes;
