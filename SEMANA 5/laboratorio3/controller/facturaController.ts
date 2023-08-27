import { Request, Response } from "express";
import { cabecera_factura } from "../src/entity/cabecera_factura";
import { validate } from "class-validator";
import { errorMonitor } from "events";
import { AppDataSource } from "../src/data-source";
import { Detalle_Factura } from "../src/entity/detalleFactura";
import { vendedor } from "../src/entity/vendedor";

class facturaController {
  static getById = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);

      if (!Numero) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const cabeFactura = AppDataSource.getRepository(cabecera_factura);
      const repositorioDetalle = AppDataSource.getRepository(Detalle_Factura);

      let factura;
      let detalleFactura;
      try {
        factura = await cabeFactura.findOneOrFail({
          where: { Numero },
        });
        detalleFactura = await repositorioDetalle.findOneOrFail({
          where: { Numero },
        });
      } catch (error) {
        return resp.status(404).json({
          mensaje:
            "No se encontro ninguna factura con ese tipo de identificacion",
        });
      }
      return resp.status(200).json({ factura, detalleFactura });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getAll = async (req: Request, resp: Response) => {
    try {
      const repositorioDetalle = AppDataSource.getRepository(Detalle_Factura);
      const repositorioCabecera = AppDataSource.getRepository(cabecera_factura);

      const listafactura = await repositorioCabecera.find();
      const listaDetalle = await repositorioDetalle.find();
      if (listafactura.length == 0 && listaDetalle.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No se han registrado facturas" });
      }
      return resp.status(200).json({ listaDetalle, listafactura });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const {
        Cantidad,
        Codigo_Productos,
        Numero,
        Fecha,
        Ruc_Cliente,
        Codigo_vendedor,
      } = req.body;

      if (Cantidad < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar un valor mayor de 0" });
      }
      if (!Codigo_Productos) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el codigo del producto" });
      }
      if (!Numero) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar el numero de factura" });
      }
      if (!Fecha) {
        return resp.status(404).json({ mensaje: "Debe de indicar la fecha" });
      }
      if (!Ruc_Cliente) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el id de cliente" });
      }
      if (!Codigo_vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Porfavor indicar el codigo del proveedor" });
      }

      const repositorioCabecera = AppDataSource.getRepository(cabecera_factura);
      const repositorioDetalle = AppDataSource.getRepository(Detalle_Factura);
      let factura;
      let detalleFactura;

      factura = await repositorioCabecera.findOne({ where: { Numero } });
      detalleFactura = await repositorioDetalle.findOne({ where: { Numero } });

      if (factura && detalleFactura) {
        return resp
          .status(404)
          .json({ mensaje: "La factura ya existe en la base de datos" });
      }

      /*
      
      const fecha = new Date();

      let producto = new Producto();
      producto.id = id;
      producto.nombre = nombre;
      producto.precio = precio;
      producto.stock = stock;
      producto.fechaIngreso = fecha;
      producto.estado = true;*/

      let detalle = new Detalle_Factura();
      let facturas = new cabecera_factura();

      detalle.Numero = Numero;
      detalle.Cantidad = Cantidad;
      detalle.producto = Codigo_Productos;
      facturas.Numero = Numero;
      facturas.Fecha = Fecha;
      facturas.Ruc_cliente = Ruc_Cliente;

      await repositorioDetalle.save(detalle);
      await repositorioCabecera.save(facturas);
      return resp.status(201).json({ mensaje: "Producto creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    let Numero;
    Numero = parseInt(req.params["Numero"]);
    try {
      const {
        Numero,
        Fecha,
        Codigo_producto,
        Ruc_cliente,
        Cantidad,
        Codigo_vendedor,
      } = req.body;
      if (!Numero) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar el numero de factura" });
      }
      if (!Fecha) {
        return resp.status(404).json({ mensaje: "Debe indicar la fecha" });
      }
      if (!Ruc_cliente) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el id del cliente" });
      }
      if (!Codigo_vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el codigo del vendedor" });
      }
      if (Cantidad < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la Cantidad mayor que 0" });
      }
      if (!Codigo_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el codigo del producto deseado" });
      }

      const repositorioCabecera = AppDataSource.getRepository(cabecera_factura);
      const repositorioDetalle = AppDataSource.getRepository(Detalle_Factura);
      const repositorioVendedor = AppDataSource.getRepository(vendedor);

      let factura: cabecera_factura;
      let detalle: Detalle_Factura;
      let vendedores: vendedor;

      try {
        factura = await repositorioCabecera.findOneOrFail({
          where: { Numero },
        });
        vendedores = await repositorioVendedor.findOneOrFail({
          where: { Codigo_vendedor },
        });
        detalle = await repositorioDetalle.findOneOrFail({ where: { Numero } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No existe ningun producto relacionado" });
      }

      factura.Numero = Numero;
      factura.Fecha = Fecha;
      factura.Ruc_cliente = Ruc_cliente;
      vendedores.Codigo_vendedor = Codigo_vendedor;
      detalle.Numero = Numero;
      detalle.Cantidad = Cantidad;
      detalle.producto = Codigo_producto;

      try {
        await repositorioCabecera.save(factura);
        await repositorioDetalle.save(detalle);

        return resp
          .status(200)
          .json({ mensaje: "Se ha guardado de forma correcta" });
      } catch (error) {
        return resp.status(400).json({ mensaje: error });
      }
    } catch (error) {
      return resp.status(404).json({ mensaje: error.error });
    }
  };
}

export default facturaController;
