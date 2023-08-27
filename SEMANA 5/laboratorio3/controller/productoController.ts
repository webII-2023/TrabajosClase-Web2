import { Request, Response } from "express";
import { AppDataSource } from "../src/data-source";
import { producto } from "../src/entity/producto";

class ProductosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const ProductosRepositorio = AppDataSource.getRepository(producto);

      const listaProductos = await ProductosRepositorio.find({
        where: { Estado_producto: true },
      });
      if (listaProductos.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No hay productos en la base de datos" });
      }

      return resp.status(200).json(listaProductos);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };
}
/* static getById = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);

      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const productosRepo = AppDataSource.getRepository(Producto);

      let producto;
      try {
        producto = await productosRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      return resp.status(200).json(producto);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };*/

export default ProductosController;
