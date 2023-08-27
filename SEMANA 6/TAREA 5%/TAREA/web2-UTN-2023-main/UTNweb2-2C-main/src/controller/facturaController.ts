import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../entity/Usuario";
import { validate } from "class-validator";
import { errorMonitor } from "events";
import { Factura } from "../entity/factura";

class FacturaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repoFact = AppDataSource.getRepository(Factura);
      let lista;
      try {
        lista = await repoFact.findOneOrFail({
          where: { estado: true },
          relations: {
            detallesFactura: { producto: true },
            cliente: { persona: true },
          },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontro datos." });
      }
      if (lista.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontro datos." });
      }
      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error al cargar datos" });
    }
  };

  static getById = async (req: Request, resp: Response) => {};

  static add = async (req: Request, resp: Response) => {};

  static update = async (req: Request, resp: Response) => {};

  static delete = async (req: Request, resp: Response) => {};
}

export default FacturaController;
