import {Router}from "express";
import  cliente from "./cliente";

const routes=Router();

routes.use('/cliente',cliente);

export default routes;
