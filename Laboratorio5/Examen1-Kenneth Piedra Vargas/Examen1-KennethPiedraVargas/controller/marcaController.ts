import { Request, Response } from "express";
import { validate } from "class-validator";
import { errorMonitor } from "events";
import { AppDataSource } from "../src/data-source";
import { Marca } from "../src/entity/Marca";
import { Color } from "../src/entity/Color";
import { Vehiculo } from "../src/entity/Vehiculo";

class MarcaController {
  static getByIdBrand = async (req: Request, resp: Response) => {
    try {
      //Tomar el Id de marca que se envio por parametro en la URL
      const id = parseInt(req.params["id"]);
      if (!id) {
        //Verificar si se mando un id por la URL
        return resp
          .status(404)
          .json({ mensaje: "Porfavor indicar el ID del vehiculo" });
      }
      //Crea variable que toma el repositorio
      const marcaEntidad = AppDataSource.getRepository(Marca);
      let marcaVehiculo;
      //Validaciones de estado de productos en base de datos
      try {
        //findOneOrFail crea una exepción al no encontrar el dato falla
        marcaVehiculo = await marcaEntidad.findOneOrFail({
          //Busca el id
          where: { id },
        });
      } catch (error) {
        return resp.status(404).json({
          mensaje: "No se encontro ninguna marca con esa identifación",
        });
      }
      return resp.status(200).json({ marcaVehiculo }); //Carga lo que se guardo
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error inesperado" });
    }
  };
  static getAllBrands = async (req: Request, resp: Response) => {
    try {
      //Tomar repositorio
      const marcaEntidad = AppDataSource.getRepository(Marca);
      //Validación logica si se encuentra la marca disponible
      const marcaVehiculo = await marcaEntidad.find({
        where: { estado: true },
      });
      // Si se encontro algun elemento en el metodo anterio su longitud sera diferente a 0
      if (marcaVehiculo.length == 0) {
        return resp.status(404).json({ mensaje: "No hay marcas registradas" });
      }
      //Devuelve la lista
      return resp.status(200).json(marcaVehiculo);
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error" });
    }
  };

  static deleteBrands = async (Request: Request, Response: Response) => {
    //Eliminado logico (cambiar el estado de la marca)
    try {
      const id = parseInt(Request.params["id"]); //tomar parametro de la url y verificarlo
      if (!id) {
        return Response.status(404).json({
          mensaje: "No se indica el ID en la URL",
        });
      }
      const marcaEntidad = AppDataSource.getRepository(Marca);
      let marcaVehiculo;

      try {
        marcaVehiculo = await marcaEntidad.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return Response.status(404).json({
          mensaje:
            "No se encontró ninguna marca registrada con esa identificación",
        });
      }
      marcaVehiculo.estado = false;
      try {
        await marcaEntidad.save(marcaVehiculo);
        return Response.status(200).json({
          mensaje: "Marca eliminada con exito",
        });
      } catch (error) {
        return Response.status(400).json({
          mensaje: "Error inesperado, no se pudó eliminar la marca",
        });
      }
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };

  static addBrands = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { id, nombre, metalizado } = req.body;

      //validacion de datos de entrada (Asegurar si los datos ingresados son correctos)
      if (!id) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la identificación de la marca" });
      }
      if (!nombre) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el nombre de la marca" });
      }
      if (!metalizado) {
        return resp.status(404).json({
          mensaje:
            "Debe indicar el si es metalizado con un true(verdadero) o false(falso) ",
        });
      }

      //validacion de reglas de negocio
      const marcaEntidad = AppDataSource.getRepository(Marca);
      const marcaVehiculo = await marcaEntidad.findOne({ where: { id } });

      if (marcaVehiculo) {
        return resp
          .status(404)
          .json({ mensaje: "La marca ya esta registrada en la BD" });
      }

      let marcaVehiculos = new Marca();
      marcaVehiculos.id = id;
      marcaVehiculos.nombre = nombre;
      marcaVehiculos.estado = true;
      marcaVehiculos.metalizado = metalizado;

      await marcaEntidad.save(marcaVehiculos);
      return resp.status(201).json({ mensaje: "Marca añadida con exitó" });
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "Error inesperado. Intenta otra vez!" });
    }
  };

  static updateBrand = async (Request: Request, Response: Response) => {
    try {
      const id = parseInt(Request.params["id"]);
      if (!id) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const marcaEntidad = AppDataSource.getRepository(Marca);
      let marcaVehiculo;
      try {
        marcaVehiculo = await marcaEntidad.findOneOrFail({
          where: { id },
        });
        //DESTRUCTURING
        const brandsVehicle = await marcaEntidad.findOneBy({ id });
        const { nombre, metalizado, estado } = Request.body;

        brandsVehicle.nombre = nombre;
        brandsVehicle.metalizado = metalizado;
        brandsVehicle.estado = estado;

        await marcaEntidad.save(brandsVehicle);
        return Response.status(200).json({
          mensaje: "Marca actualizada con exito!",
        });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontro niguna marca con esa identificación",
        });
      }
    } catch (error) {
      return Response.status(404).json({
        mensaje: "Error inesperado, vuelva a intentar profavor!",
      });
    }
  };
}
export default MarcaController;
