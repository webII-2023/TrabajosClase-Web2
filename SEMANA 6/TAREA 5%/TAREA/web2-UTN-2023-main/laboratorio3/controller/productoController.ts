import { Request, Response } from "express";
import { AppDataSource } from "../src/data-source";
import { Producto } from "../src/entity/Producto";
import { validate } from "class-validator";

class ProductosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const productosRepo = AppDataSource.getRepository(Producto);

      const listaProductos = await productosRepo.find({
        where: { Estado_producto: true },
      });

      if (listaProductos.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontró ningun resultado" });
      }
      return resp.status(200).json(listaProductos);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const Codigo_producto = parseInt(req.params["id"]);

      if (!Codigo_producto) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const productosRepo = AppDataSource.getRepository(Producto);

      let producto;
      try {
        producto = await productosRepo.findOneOrFail({
          where: { Codigo_producto, Estado_producto: true },
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
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const {
        Codigo_producto,
        Descripcion_producto,
        Precio_producto,
        Stock_maximo_producto,
        Stock_minimo_producto,
        Codigo_proveedor,
      } = req.body;

      //validacion de datos de entrada
      if (!Codigo_producto) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }
      if (!Descripcion_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el nombre del producto" });
      }
      if (!Precio_producto) {
        return resp.status(404).json({ mensaje: "Debe indicar el precio" });
      }
      if (!Stock_minimo_producto) {
        return resp.status(404).json({ mensaje: "Debe indicar stock minimo" });
      }
      if (!Codigo_proveedor) {
        return resp.status(404).json({ mensaje: "Codigo proveedor" });
      }
      if (Precio_producto < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar un precio mayor que 0" });
      }
      if (!Stock_maximo_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el stock del producto" });
      }
      if (Stock_maximo_producto < 0) {
        return resp
          .status(404)
          .json({ mensaje: "El stock debe ser mayor que ser" });
      }

      //validacion de reglas de negocio
      const productosRepo = AppDataSource.getRepository(Producto);
      const pro = await productosRepo.findOne({ where: { Codigo_producto } });

      if (pro) {
        return resp
          .status(404)
          .json({ mensaje: "El producto ya existe en la base datos." });
      }

      let producto = new Producto();
      producto.Codigo_producto = Codigo_producto;
      producto.Descripcion_producto = Descripcion_producto;
      producto.Precio_producto = Precio_producto;
      producto.Stock_maximo_producto = Stock_maximo_producto;
      producto.Stock_minimo_producto = Stock_minimo_producto;
      producto.Estado_producto = true;
      producto.proveedor = Codigo_proveedor;

      await productosRepo.save(producto);
      return resp.status(201).json({ mensaje: "Producto creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "ah" });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const {
      Codigo_producto,
      Descripcion_producto,
      Precio_producto,
      Stock_maximo_producto,
      Stock_minimo_producto,
      Codigo_proveedor,
    } = req.body;

    //validacion de datos de entrada
    //validacion de datos de entrada
    if (!Codigo_producto) {
      return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    }
    if (!Descripcion_producto) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del producto" });
    }
    if (!Precio_producto) {
      return resp.status(404).json({ mensaje: "Debe indicar el precio" });
    }
    if (!Stock_minimo_producto) {
      return resp.status(404).json({ mensaje: "Debe indicar stock minimo" });
    }
    if (!Codigo_proveedor) {
      return resp.status(404).json({ mensaje: "Falata el Codigo proveedor" });
    }
    if (Precio_producto < 0) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar un precio mayor que 0" });
    }
    if (!Stock_maximo_producto) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el stock del producto" });
    }
    if (Stock_maximo_producto < 0) {
      return resp
        .status(404)
        .json({ mensaje: "El stock debe ser mayor que ser" });
    }

    //validacion de reglas de negocio
    const productosRepo = AppDataSource.getRepository(Producto);
    let productos: Producto;
    try {
      productos = await productosRepo.findOneOrFail({
        where: { Codigo_producto },
      });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto." });
    }

    productos.Descripcion_producto = Descripcion_producto;
    productos.Precio_producto = Precio_producto;
    productos.Stock_maximo_producto = Stock_maximo_producto;
    productos.Stock_minimo_producto = Stock_minimo_producto;

    try {
      await productosRepo.save(productos);
      return resp.status(200).json({ mensaje: "Se guardo correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "No pudo guardar." });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const Codigo_producto = parseInt(req.params["id"]);
      if (!Codigo_producto) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }

      const productosRepo = AppDataSource.getRepository(Producto);
      let pro: Producto;
      try {
        pro = await productosRepo.findOneOrFail({
          where: { Codigo_producto: Codigo_producto, Estado_producto: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra el producto con ese ID" });
      }

      pro.Estado_producto = false;
      try {
        await productosRepo.save(pro);
        return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default ProductosController;
