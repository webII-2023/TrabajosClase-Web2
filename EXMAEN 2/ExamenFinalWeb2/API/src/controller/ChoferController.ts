import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Chofer } from '../entity/Chofer';
import { LicenciaChofer } from '../entity/ChoferLicencias';
import { Licencia } from '../entity/Licencias';
import { exit } from 'process';
import { In } from 'typeorm';

class ChoferController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const choferRepo = AppDataSource.getRepository(Chofer);
      const lista = await choferRepo.find({
        where: { estado: true },
        relations: { licencias: true },
      });
      if (lista.length == 0) {
        return resp.status(404).json({ mensaje: 'No se encontró resultados.' });
      }
      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };
  //metodo - obtener producto por su codigo
  static getById = async (req: Request, resp: Response) => {
    try {
      const cedula = req.params['cedula'];
      if (!cedula) {
        return resp
          .status(404)
          .json({ mensaje: 'No se indica la cedula del chofer' });
      }
      const choferRepo = AppDataSource.getRepository(Chofer);
      let chofer;
      try {
        chofer = await choferRepo.findOneOrFail({
          where: { cedula: cedula },
          relations: { licencias: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No se encontro el chofer con esa cedula' });
      }
      return resp.status(200).json(chofer);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };
  //agregar producto
  static add = async (req: Request, resp: Response) => {
    try {
      // Destructurando
      const { cedula, nombre, apellido1, apellido2, fechaNac, licencias } =
        req.body;
      // validacion de datos de entrada
      if (!cedula) {
        return resp
          .status(400)
          .json({ mensaje: 'Debe indicar la cedula del chofer' });
      }
      if (!nombre) {
        return resp
          .status(400)
          .json({ mensaje: 'Debe indicar una nombre del chofer' });
      }
      if (!apellido1) {
        return resp
          .status(400)
          .json({ mensaje: 'Debe indicar el primer apellido del chofer' });
      }
      if (!apellido2) {
        return resp
          .status(400)
          .json({ mensaje: 'Debe indicar el primer segundo del chofer' });
      }

      if (!fechaNac) {
        return resp
          .status(400)
          .json({ mensaje: 'Debe indicar la fecha de nacimiento del chofer' });
      }

      const bornDate = new Date(fechaNac);
      const today = new Date();
      let age = today.getFullYear() - bornDate.getFullYear();
      const month = today.getMonth() - bornDate.getMonth();

      if (month < 0 || (month === 0 && today.getDate() < bornDate.getDate())) {
        age--;
      }

      if (age < 18) {
        return resp.status(400).json({
          mensaje: 'El chofer debe ser mayor de 18 años para poder registrarse',
        });
      }

      if (!licencias || licencias.length == 0) {
        return resp
          .status(400)
          .json({ mensaje: 'Debe asignar licencias al chofer' });
      }
      // validacion de reglas de negocio
      const choferRepo = AppDataSource.getRepository(Chofer);
      const liceRepo = AppDataSource.getRepository(LicenciaChofer);

      const chofer = await choferRepo.findOne({ where: { cedula: cedula } });
      if (chofer) {
        return resp
          .status(400)
          .json({ mensaje: 'El chofer ya existe en la base de datos' });
      }

      //Validar licencia repetida
      const listaLicenciasIds = licencias.map((lic) => lic.id);
      const duplicados = listaLicenciasIds.filter(
        (id, index) => listaLicenciasIds.indexOf(id) !== index
      );

      if (duplicados.length > 0) {
        return resp.status(400).json({
          mensaje: 'No puedes asignar la misma licencia más de una vez',
        });
      }

      //validacion de licencias repetidas

      const listaLicencias = licencias.map((lic) => {
        const licChof = new LicenciaChofer();
        licChof.chofer = cedula;
        licChof.licencia = lic.id;
        return licChof;
      });

      let choferNew = new Chofer();
      choferNew.cedula = cedula;
      choferNew.nombre = nombre;
      choferNew.apellido1 = apellido1;
      choferNew.apellido2 = apellido2;
      choferNew.fechaNac = fechaNac;
      choferNew.licencias = listaLicencias;
      choferNew.estado = true;
      try {
        await choferRepo.save(choferNew);
        return resp.status(201).json({ mensaje: 'Chofer creado' });
      } catch (error) {
        return resp.status(400).json({ mensaje: 'Error al guardar.' });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    //   const { id, nombre, precio, stock, fechaIngreso } = req.body;
    //   //validacion de datos de entrada
    //   if (!id) {
    //     return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    //   }
    //   if (!nombre) {
    //     return resp
    //       .status(404)
    //       .json({ mensaje: "Debe indicar el nombre del producto" });
    //   }
    //   if (!precio) {
    //     return resp.status(404).json({ mensaje: "Debe indicar el precio" });
    //   }
    //   if (precio < 0) {
    //     return resp
    //       .status(404)
    //       .json({ mensaje: "Debe indicar un precio mayor que 0" });
    //   }
    //   if (!stock) {
    //     return resp
    //       .status(404)
    //       .json({ mensaje: "Debe indicar el stock del producto" });
    //   }
    //   if (stock < 0) {
    //     return resp
    //       .status(404)
    //       .json({ mensaje: "El stock debe ser mayor que ser" });
    //   }
    //   //Validar Reglas de negocio
    //   const productosRepo = AppDataSource.getRepository(Producto);
    //   let pro: Producto;
    //   try {
    //     pro = await productosRepo.findOneOrFail({ where: { id } });
    //   } catch (error) {
    //     return resp.status(404).json({ mensaje: "No existe el producto." });
    //   }
    //   pro.nombre = nombre;
    //   pro.precio = precio;
    //   pro.stock = stock;
    //   // pro.fechaIngreso
    //   //Validar con class validator
    //   const errors = await validate(pro, {
    //     validationError: { target: false, value: false },
    //   });
    //   if (errors.length > 0) {
    //     return resp.status(400).json(errors);
    //   }
    //   try {
    //     await productosRepo.save(pro);
    //     return resp.status(200).json({ mensaje: "Se guardo correctamente" });
    //   } catch (error) {
    //     return resp.status(400).json({ mensaje: "No pudo guardar." });
    //   }
  };
  static delete = async (req: Request, resp: Response) => {
    //   try {
    //     const id = parseInt(req.params["id"]);
    //     if (!id) {
    //       return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    //     }
    //     const productosRepo = AppDataSource.getRepository(Producto);
    //     let pro: Producto;
    //     try {
    //       pro = await productosRepo.findOneOrFail({
    //         where: { id: id, estado: true },
    //       });
    //     } catch (error) {
    //       return resp
    //         .status(404)
    //         .json({ mensaje: "No se encuentra el producto con ese ID" });
    //     }
    //     pro.estado = false;
    //     try {
    //       await productosRepo.save(pro);
    //       return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
    //     } catch (error) {
    //       return resp.status(400).json({ mensaje: "No se pudo eliminar." });
    //     }
    //   } catch (error) {
    //     return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    //   }
  };
}

export default ChoferController;
