import { Request, Response } from "express";
import { Cabecera_factura } from "../src/entity/Cabecera_factura";
import { validate } from "class-validator";
import { errorMonitor } from "events";
import { AppDataSource } from "../src/data-source";
import { Detalle_Factura } from "../src/entity/DetalleFactura";
import { Vendedor } from "../src/entity/Vendedor";
import { Cliente } from "../src/entity/Cliente";
import { Producto } from "../src/entity/Producto";

class facturaController {
  static getById = async (req: Request, resp: Response) => {
    try {
      //Tomar el Id factura que se envio por parametro
      const Numero = parseInt(req.params["Numero"]);
      if (!Numero) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const cabeceraFactura = AppDataSource.getRepository(Cabecera_factura);
      const repositorioDetalle = AppDataSource.getRepository(Detalle_Factura);
      //Instanciar repositorios
      let factura;
      let detalleFactura;
      //Validaciones de estado de productos en base de datos
      try {
        //findOneOrFail crea una exepción al no encontrar el dato
        factura = await cabeceraFactura.findOneOrFail({
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
      const repoFact = AppDataSource.getRepository(Cabecera_factura);
      let lista;
      try {
        lista = await repoFact.findOneOrFail({
          where: { estado: true },
          relations: {
            Detalle_Factura: { Producto: true },
            Ruc_cliente: { Cabecera_factura: true },
          },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No ningun tipo de dato relacionado." });
      }
      if (lista.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No ningun tipo de dato relacionado." });
      }
      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error" });
    }
  };
  /*--------------------------------------------------------------------------------------------*/
  //Anadir factura con su detalle
  static add = async (req: Request, resp: Response) => {
    //destructor
    try {
      const {
        Numero,
        Fecha,
        Ruc_Cliente,
        Estado,
        Codigo_vendedor,
        Cantidad,
        Codigo_producto,
      } = req.body;
      //Validación de datos de entrada
      if (!Numero) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar el numero de factura" });
      }
      if (!Estado) {
        return resp.status(404).json({ mensaje: "Debe indicar el estado" });
      }
      if (!Fecha) {
        return resp.status(404).json({ mensaje: "Debe indicar la fecha" });
      }
      if (!Ruc_Cliente) {
        return resp.status(404).json({ mensaje: "Debe indicar el Id cliente" });
      }
      if (!Codigo_vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Id vendedor" });
      }
      if (Cantidad < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar una Cantidad mayor que cero" });
      }
      if (!Codigo_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el codigo del producto" });
      }
      //Intancias a los repositorios
      const CabceraRepositorio = AppDataSource.getRepository(Cabecera_factura);
      const DetallesRepositorio = AppDataSource.getRepository(Detalle_Factura);

      let FacturaCabecera, DetalleCabecera, productosCabecera;

      FacturaCabecera = await CabceraRepositorio.findOne({ where: { Numero } });
      DetalleCabecera = await DetallesRepositorio.findOne({
        where: { Numero },
      });
      //Validación del producto en base de datos
      if (FacturaCabecera && DetalleCabecera) {
        return resp
          .status(404)
          .json({ mensaje: "La factura ya existe en la base de datos" });
      }

      /************************************************************************* */
      const productosD = AppDataSource.getRepository(Producto);
      const Codigo_Producto = parseInt(req.params["Codigo_producto"]);
      try {
        //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
        // Encuentre
        productosCabecera = await productosD.findOneOrFail({
          where: { Codigo_producto: Codigo_producto },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      /************************************************************************* */

      let CabeceraFactura = new Cabecera_factura();
      let DetalleFactura = new Detalle_Factura();

      CabeceraFactura.Numero = Numero;
      CabeceraFactura.Fecha = Fecha;
      CabeceraFactura.estado = Estado;
      CabeceraFactura.Ruc_cliente = Ruc_Cliente;
      CabeceraFactura.vendedor = Codigo_vendedor;

      DetalleFactura.Numero = Numero;
      DetalleFactura.Cantidad = Cantidad;
      DetalleFactura.idProducto = Codigo_producto;

      await CabceraRepositorio.save(CabeceraFactura); //Guardar en cabecera factura
      await DetallesRepositorio.save(DetalleFactura); //Guardar en detalles
      return resp.status(200).json({ mensaje: "Factura guardada con exito" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  /***************************************************************************** */
  static update = async (req: Request, resp: Response) => {
    try {
      const {
        Numero,
        Fecha,
        Ruc_Cliente,
        Estado,
        Codigo_vendedor,
        Cantidad,
        Codigo_producto,
      } = req.body;
      if (!Numero) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar el numero de factura" });
      }
      if (!Estado) {
        return resp.status(404).json({ mensaje: "Debe indicar el estado" });
      }
      if (!Fecha) {
        return resp.status(404).json({ mensaje: "Debe indicar la fecha" });
      }
      if (!Ruc_Cliente) {
        return resp.status(404).json({ mensaje: "Debe indicar el Id cliente" });
      }
      if (!Codigo_vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Id vendedor" });
      }
      /*   if (!Cantidad) {
        return resp.status(404).json({ mensaje: "Debe indicar la cantidad" });
      }
      if (Cantidad < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar una Cantidad mayor que cero" });
      }*/
      /* if (!Codigo_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el codigo del producto" });
      }*/

      // let FacturaCabecera, DetalleCabecera, productosCabecera;
      let pro: Cabecera_factura;
      const CabeaRepositorio = AppDataSource.getRepository(Cabecera_factura);
      try {
        pro = await CabeaRepositorio.findOneOrFail({
          where: { Numero },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra el Id de factura" });
      }

      // const DetaRepositorio = AppDataSource.getRepository(Detalle_Factura);

      pro.Fecha = Fecha;
      pro.estado = Estado;
      pro.vendedor = Codigo_producto;

      //DetalleCabecera.Numero = Numero;
      //DetalleCabecera.Cantidad = Cantidad;
      //DetalleCabecera.idProducto = Codigo_producto;

      try {
        await CabeaRepositorio.save(pro);
        return resp.status(200).json({ mensaje: "Se guardo correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No pudo guardar." });
      }
    } catch (error) {
      return resp.status(404).json({ mensaje: "Error" });
    }
  };
  /*--------------------------------------------------------------------------------------------*/
  //Eliminar logico en factura
  static deleteLogico = async (req: Request, resp: Response) => {
    try {
      //Tomar parametro
      let Numero;
      Numero = parseInt(req.params["Numero"]);
      //Verificar si el parametro fue ingresado
      if (!Numero) {
        return resp
          .status(400)
          .json({ mensaje: "Porfavor indique el ID de factura" });
      }

      const CabezaraRepositorio = AppDataSource.getRepository(Cabecera_factura);
      const factura = await CabezaraRepositorio.findOne({
        where: { estado: true, Numero },
      });

      //Validar si la factura existe-----------------------------------------------
      if (!factura) {
        return resp.status(404).json({ mensaje: "El Id de factura no existe" });
      }
      //--------------------------------------------------------------------------
      try {
        factura.estado = false;
        await CabezaraRepositorio.save(factura); //Guardar estado de factura
        return resp.status(200).json({ mensaje: "Ha sido elimina con exito" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar" });
      }
    } catch (error) {
      return resp.status(404).json({ mensaje: error });
    }
  };

  //Eliminar detalle de factura
  static deleteDetalle = async (req: Request, resp: Response) => {
    let Numero;
    //Tomar parametro
    try {
      Numero = parseInt(req.params["Numero"]);
      if (!Numero) {
        return resp.status(400).json({ mensaje: "Debe indicar el Id factura" });
      }
      //Verificar que la factura este en la Base de datos
      const DetallesRepositorio = AppDataSource.getRepository(Detalle_Factura);
      let factura;
      try {
        factura = await DetallesRepositorio.findOne({ where: { Numero } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra en la base de datos" });
      }
      //-------------------------------------------------
      try {
        await DetallesRepositorio.delete(factura); //Guardar cambios
        return resp.status(200).json({ mensaje: "Se ha eliminado con exito" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar" });
      }
    } catch (error) {
      return resp.status(404).json({ mensaje: error });
    }
  };
}

export default facturaController;
