import { Router } from "express";
import cliente from "./cliente";
import facturas from "./facturas";
import producto from "./productos";

const routes = Router();

routes.use("/producto", producto);
routes.use("/facturas", facturas);
routes.use("/cliente", cliente);

export default routes;
