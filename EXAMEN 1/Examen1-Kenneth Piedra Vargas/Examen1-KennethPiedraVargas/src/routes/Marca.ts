import { Router } from "express";
import MarcaController from "../../controller/marcaController";

const routes = Router();
//Llamar los metodos para verificarlos
routes.get("/:id", MarcaController.getByIdBrand);
routes.get("", MarcaController.getAllBrands);
routes.delete("/:id", MarcaController.deleteBrands);
routes.post("", MarcaController.addBrands);
routes.patch("/:id", MarcaController.updateBrand);

export default routes;
