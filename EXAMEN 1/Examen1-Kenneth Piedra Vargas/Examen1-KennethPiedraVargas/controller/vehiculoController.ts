import { Request, Response } from "express";
import { validate } from "class-validator";
import { errorMonitor } from "events";
import { AppDataSource } from "../src/data-source";
import { Vehiculo } from "../src/entity/Vehiculo";
import { Color } from "../src/entity/Color";
import { Tipo_Vehiculo } from "../src/entity/Tipo_Vehiculo";
import { Marca } from "../src/entity/Marca";

class VehiculoController {
  static getByPlaca = async (req: Request, resp: Response) => {
    try {
      //Tomar el Id factura que se envio por parametro
      const placa = req.params["id"];
      if (!placa) {
        return resp
          .status(404)
          .json({ mensaje: "Porfavor indicar la placa del vehiculo" });
      }
      const vehiculoEntidad = AppDataSource.getRepository(Vehiculo);
      const colorEntidad = AppDataSource.getRepository(Color);
      const tipoVehiculoEntidad = AppDataSource.getRepository(Tipo_Vehiculo);

      let vehiculo, vehiculoPlaca, estado;
      //Reglas de negocio
      //Verificar si el vehiculo se encuentra disponible por medio del estado

      //Validaciones de estado de productos en base de datos
      try {
        //findOneOrFail crea una exepción al no encontrar el dato falla
        vehiculo = await vehiculoEntidad.findOneOrFail({
          where: { placa },
          relations: {
            //nos devuelve las relaciones
            tipoVehiculos: true,
            colors: true,
            marca: true,
          },
        });
        vehiculoPlaca = await vehiculoEntidad.findOne({ where: { placa } });
        estado = vehiculoPlaca.estado;
        if (estado == 0) {
          //si estado es igual a cero el vehiculo no esta activo
          return resp
            .status(404)
            .json({ mensaje: "No se encontro ningun registro del vehiculo" });
        }
      } catch (error) {
        return resp.status(404).json({
          mensaje: "No se encontro ningun vehiculo con esa identifación",
        });
      }
      return resp.status(200).json({ vehiculo }); //muestra el vehiculo con sus relaciones
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error inesperado" });
    }
  };

  static deleteVehicle = async (Request: Request, Response: Response) => {
    //Eliminado logico (cambiar el estado de la marca)
    try {
      const placa = Request.params["id"]; //tomar parametro de la url y verificarlo
      if (!placa) {
        return Response.status(404).json({
          mensaje: "Porfavor indicar la placa del vehiculo que desea eliminar",
        });
      }
      //Tomar repositorio del vehiculo
      const vehiculoEntidad = AppDataSource.getRepository(Vehiculo);
      let vehiculo; //declarar lista

      try {
        vehiculo = await vehiculoEntidad.findOneOrFail({
          where: { placa, estado: true }, //Verficar si se encuentra un vehiculo con esa placa
        });
      } catch (error) {
        return Response.status(404).json({
          mensaje:
            "No se encontró ninguna placa registrada en la Base de Datos",
        }); //Mensaje de error de inexistencía del vehiculo
      }
      vehiculo.estado = false; //Cambiar estatus del atributo estado de la entidad vehiculo a falso
      //para el borrado logico
      try {
        await vehiculoEntidad.save(vehiculo);
        return Response.status(200).json({
          mensaje: "El vehiculo fue eliminada con exito",
        });
      } catch (error) {
        return Response.status(400).json({
          mensaje:
            "Error inesperado, no se pudó eliminar la vehiculo. Intenta otra vez!",
        });
      }
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };

  //Metodo de añadir vehiculo
  static addVehicle = async (req: Request, resp: Response) => {
    //destructor
    try {
      const { id, placa, cilindraje, marca, color, tipoVehiculo } = req.body;
      //Validaciciónes de datos de entrada
      if (!id) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la identificación del vehiculo" });
      }
      if (!placa) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar la placa del vehiculo" });
      }
      if (!cilindraje) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar el cilindaje del vehiculo" });
      }
      if (!marca) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar el la marca del vehiculo" });
      }
      if (!color) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar el color del vehiculo" });
      }

      if (!tipoVehiculo) {
        return resp
          .status(404)
          .json({ mensaje: "Debe de indicar el tipo de vehiculo" });
      }
      //Tomar repositorios, en este caso hay que tomar 4 repositorios
      //ya que dicha entidad cuenta con 3 llaves foranía de otras tablas
      //y se debe de validar la existencia de los atributos
      const vehiculoEntidad = AppDataSource.getRepository(Vehiculo);
      const marcaEntidad = AppDataSource.getRepository(Marca);
      const colorEntidad = AppDataSource.getRepository(Color);
      const tipoVehiculoEntidad = AppDataSource.getRepository(Tipo_Vehiculo);
      let vehiculo, marcaVehiculo, colorVehiculo, tipoVehiculos, vehiculoPlaca;

      //Validaciónes de regla de negocios
      vehiculo = await vehiculoEntidad.findOne({ where: { id } });
      vehiculoPlaca = await vehiculoEntidad.findOne({ where: { placa } });
      if (vehiculo) {
        return resp
          .status(404)
          .json({ mensaje: "El vehiculo ya existe en la base de datos" });
      } else if (vehiculoPlaca) {
        return resp.status(404).json({
          mensaje: "La placa del vehiculo ya existe en la base de datos",
        });
      }
      try {
        //verificar si el color existe
        colorVehiculo = await colorEntidad.findOneOrFail({
          where: { id: color },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontra ese color registrado" });
      }
      try {
        //Verficar si la marca existe
        marcaVehiculo = await marcaEntidad.findOneOrFail({
          where: { id: marca },
        });
      } catch (error) {
        return resp.status(404).json({
          mensaje: "No se encuentra esa marca de vehiculo registrada",
        });
      }
      try {
        //Verificar si el tipo de vehiculo se encuentra
        tipoVehiculos = await tipoVehiculoEntidad.findOneOrFail({
          where: { id: tipoVehiculo },
        });
      } catch (error) {
        return resp.status(404).json({
          mensaje: "No se encuentra ese tipo de vehiculo registrado",
        });
      }
      //Intanciar el objecto
      let newVehicles = new Vehiculo();
      const fechaActual = new Date();
      newVehicles.id = id; //asignar los datos
      newVehicles.placa = placa;
      newVehicles.cilindraje = cilindraje;
      newVehicles.fecha_ingreso = fechaActual;
      newVehicles.estado = true;
      newVehicles.marca = marca;
      newVehicles.colors = color;
      newVehicles.tipoVehiculos = tipoVehiculo;

      await vehiculoEntidad.save(newVehicles); //Guardar en la entidad vehiculo
      return resp
        .status(200)
        .json({ mensaje: "El vehiculo ha sido guardado con exito" });
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "Error inesperado, dd vuelve a intentarlo!" });
    }
  };
}
export default VehiculoController;
