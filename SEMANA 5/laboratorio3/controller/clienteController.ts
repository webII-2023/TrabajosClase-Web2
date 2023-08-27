import { Request, Response } from "express";
import { cliente } from "../src/entity/cliente";
import { AppDataSource } from "../src/data-source";

class clienteController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const findClients = AppDataSource.getRepository(cliente);
      const clients = await findClients.find();
      resp.json(clients);
      if (clients.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No hay datos en la base de datos" });
      }
      return resp.status(200).json(clients);
    } catch (error) {
      resp.status(500).json({
        message:
          "Error to find the clients. Please verify if there are people in registered",
      });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const Ruc_cliente = parseInt(req.params["id"]);
      if (!Ruc_cliente) {
        return resp.status(404).json({ mensaje: "Indique la identificación" });
      }
      const repositorioCliente = AppDataSource.getRepository(cliente);
      let clientes;

      try {
        clientes = await repositorioCliente.findOneOrFail({
          where: { Ruc_cliente },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No hay coincidencia de productos" });
      }

      return resp.status(200).json({ cliente });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.error });
    }
  };

  static add = async (req: Request, resp: Response) => {};
  static update = async (req: Request, resp: Response) => {};
  static delete = async (req: Request, resp: Response) => {};
}

export default clienteController;
