import { Request, Response, response } from "express";
import { AppDataSource } from "../src/data-source";
import { Cliente } from "../src/entity/Cliente";
import { validate } from "class-validator";

class Productos_Controller {
  static getAll = async (Request: Request, Response: Response) => {
    try {
      const clientesRepo = AppDataSource.getRepository(Cliente);
      const listClientes = await clientesRepo.find({ where: { Estado: true } });

      if (listClientes.length == 0) {
        return Response.status(404).json({
          mensaje: "No se encontró resultado",
        });
      }

      return Response.status(200).json(listClientes);
    } catch (error) {
      return Response.status(400).json({ mensaje: error });
    }
  };
  static getById = async (Request: Request, Response: Response) => {
    try {
      const Ruc_cliente = parseInt(Request.params["id"]);

      if (!Ruc_cliente) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }

      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({
          where: { Ruc_cliente },
        });
        return Response.status(200).json({ cliente });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró al cliente con ese ID",
        });
      }
    } catch (error) {
      return Response.status(400).json({ mensaje: error });
    }
  };

  static delete = async (Request: Request, Response: Response) => {
    try {
      const Ruc_cliente = parseInt(Request.params["id"]);
      if (!Ruc_cliente) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente: Cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({
          where: { Ruc_cliente, Estado: true },
        });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró la identifacion del cliente",
        });
      }
      cliente.Estado = false;
      try {
        await clientesRepo.save(cliente);
        return Response.status(200).json({
          mensaje: "cliente eliminado con exito",
        });
      } catch (error) {
        return Response.status(400).json({
          mensaje: "No se pudo eliminar el cliente",
        });
      }
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };

  static add = async (Request: Request, Response: Response) => {
    try {
      //DESTRUCTURING
      const {
        Ruc_cliente,
        Nombres_cliente,
        Apellidos_cliente,
        Direccion_cliente,
        Telefono_cliente,
        Estado,
      } = Request.body;

      let cliente = new Cliente();
      cliente.Ruc_cliente = Ruc_cliente;
      cliente.Nombres_cliente = Nombres_cliente;
      cliente.Apellidos_cliente = Apellidos_cliente;
      cliente.Direccion_cliente = Direccion_cliente;
      cliente.Telefono_cliente = Telefono_cliente;
      cliente.Estado = true;

      //Validación de Reglas de negocio
      const clientesRepo = AppDataSource.getRepository(Cliente);
      const clien = await clientesRepo.findOne({
        where: { Ruc_cliente: Ruc_cliente },
      });

      if (clien) {
        return Response.status(404).json({ mensaje: "Cliente Existente" });
      }

      await clientesRepo.save(cliente);
      return Response.status(201).json({ mensaje: "Cliente Creado" });
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };

  static update = async (Request: Request, Response: Response) => {
    try {
      const Ruc_cliente = parseInt(Request.params["id"]);
      if (!Ruc_cliente) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const clientesRepositorio = AppDataSource.getRepository(Cliente);
      let cliente;
      try {
        cliente = await clientesRepositorio.findOneOrFail({
          where: { Ruc_cliente },
        });
        //DESTRUCTURING
        const clienteUp = await clientesRepositorio.findOneBy({ Ruc_cliente });
        const {
          Ruc_cliented,
          Nombres_cliente,
          Apellidos_cliente,
          Direccion_cliente,
          Telefono_cliente,
          Estado,
        } = Request.body;

        clienteUp.Ruc_cliente = Ruc_cliente;
        clienteUp.Nombres_cliente = Nombres_cliente;
        clienteUp.Apellidos_cliente = Apellidos_cliente;
        clienteUp.Direccion_cliente = Direccion_cliente;
        clienteUp.Telefono_cliente = Telefono_cliente;
        clienteUp.Estado = true;

        await clientesRepositorio.save(clienteUp);
        return Response.status(200).json({ mensaje: "Cliente Actualizado!" });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró el cliente con ese ID",
        });
      }
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };
}

export default Productos_Controller;
