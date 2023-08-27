import { Router } from "express";
import UsuarioController from "../../controller/UsuarioController";

const routes = Router();

routes.post("/login", UsuarioController.login);

export default routes;
