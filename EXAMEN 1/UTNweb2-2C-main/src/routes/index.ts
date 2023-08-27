import { Router } from "express";
import producto from "./productos";
import auth from "./auth";
import usuarios from "./usuarios";
import { checkjwt } from "../middleware/jwt";
const routes = Router();

routes.use("/productos", producto);
routes.use("/auth", auth);
routes.use("/usuarios", usuarios);

export default routes;
