import { Request, Response } from "express";
import { validate } from "class-validator";
import { errorMonitor } from "events";
import { AppDataSource } from "../src/data-source";
import { Marca } from "../src/entity/Marca";
import { Color } from "../src/entity/Color";
import { Vehiculo } from "../src/entity/Vehiculo";

//Crear clase donde estaran los metodos
class MarcaController {
  //Metodo de mostrar una marca especifica con su ID
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
      let marcaVehiculo, estado, estadoVehiculo;

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
      estadoVehiculo = await marcaEntidad.findOne({ where: { id } });
      estado = estadoVehiculo.estado;
      if (estado == 0) {
        //si estado es igual a cero el vehiculo no esta activo
        return resp
          .status(404)
          .json({ mensaje: "No se encontro nunguna marca relacionada" });
      }

      return resp.status(200).json({ marcaVehiculo }); //Carga lo que se guardo en la variable
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error inesperado" });
    }
  };
  //Metodo de mostrar todas las marcas
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
      //Devuelve la lista de las marcas encontrada
      return resp.status(200).json(marcaVehiculo);
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error" });
    }
  };
  //Metodo para borra una marca con su ID
  static deleteBrands = async (Request: Request, Response: Response) => {
    //Eliminado logico (cambiar el estado de la marca)
    try {
      const id = parseInt(Request.params["id"]); //tomar parametro de la url y verificarlo
      if (!id) {
        return Response.status(404).json({
          mensaje: "No se indica el ID en la URL",
        });
      }
      //Tomar repositorio
      const marcaEntidad = AppDataSource.getRepository(Marca);
      let marcaVehiculo;
      //validaciones de negocio
      try {
        marcaVehiculo = await marcaEntidad.findOneOrFail({
          where: { id, estado: true }, //Verifica si se encuentra el id y si su estado es activo
        });
      } catch (error) {
        return Response.status(404).json({
          mensaje:
            "No se encontró ninguna marca registrada con esa identificación",
        });
      }
      marcaVehiculo.estado = false; //Cambia el estado para un eliminado logico
      try {
        await marcaEntidad.save(marcaVehiculo); //lo guarda en el repositorio
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
  //Metodo para añadir todas una marca
  static addBrands = async (req: Request, resp: Response) => {
    try {
      const { id, nombre, metalizado } = req.body; //en el cuerpo del json tienen que ir las varuables
      //Validaciones de datos de entrada

      if (!nombre) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el nombre de la marca" });
      }
      if (typeof metalizado !== "boolean") {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar si es metalizado como true o false" });
      }
      //tomar repositorio
      const marcaEntidad = AppDataSource.getRepository(Marca);
      const existentBrand = await marcaEntidad.findOne({ where: { nombre } });

      //validacion de reglas de negocio

      if (existentBrand) {
        return resp
          .status(404)
          .json({ mensaje: "El nombre de la marca ya está registrado" });
      }
      //intanciar el objecto
      const marcaVehiculos = new Marca();
      // marcaVehiculos.id = id; //Asignar las variables del json a las columnas de la entidad
      marcaVehiculos.nombre = nombre;
      marcaVehiculos.estado = true;
      marcaVehiculos.metalizado = metalizado;

      await marcaEntidad.save(marcaVehiculos); //Guardar cambios
      return resp.status(201).json({ mensaje: "Marca añadida con éxito" });
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "Error inesperado. Intenta otra vez" });
    }
  };
  //Actualizar marca
  static updateBrand = async (Request: Request, Response: Response) => {
    try {
      const id = parseInt(Request.params["id"]); //Tomar parametro de la URL
      if (!id) {
        return Response.status(404).json({ mensaje: "No se indica el ID" });
      }
      //Tomar repositorio
      const marcaEntidad = AppDataSource.getRepository(Marca);

      try {
        const marcaVehiculo = await marcaEntidad.findOneOrFail({
          where: { id },
        });

        const { nombre, metalizado, estado } = Request.body; //variables a actualizar

        const existentBrand = await marcaEntidad.findOne({
          where: { nombre },
        });

        if (existentBrand && existentBrand.id !== id) {
          return Response.status(400).json({
            mensaje: "El nombre de la marca ya está registrado",
          });
        }

        marcaVehiculo.nombre = nombre; //Asignar variables a los atributos de la entidad
        marcaVehiculo.metalizado = metalizado;
        marcaVehiculo.estado = estado;

        await marcaEntidad.save(marcaVehiculo); //Guardar en la base datos con el metodo

        return Response.status(200).json({
          mensaje: "Marca actualizada con éxito",
        });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró ninguna marca con esa identificación",
        });
      }
    } catch (error) {
      return Response.status(500).json({
        mensaje: "Error inesperado, por favor inténtalo nuevamente",
      });
    }
  };
}
export default MarcaController;
