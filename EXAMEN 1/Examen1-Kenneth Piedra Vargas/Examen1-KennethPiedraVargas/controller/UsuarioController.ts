import { Request, Response } from "express";

import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../src/data-source";
import { Usuarios } from "../src/entity/Usuario";

class UsuarioController {
  static login = async (req: Request, resp: Response) => {
    const { correo, contrasena } = req.body;

    if (!(correo || contrasena)) {
      return resp
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrecta." });
    }

    const repoUsuario = AppDataSource.getRepository(Usuarios);
    let usuario: Usuarios;
    try {
      usuario = await repoUsuario.findOneOrFail({ where: { correo: correo } });
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrecta." });
    }

    if (!usuario.checkPassword(contrasena)) {
      return resp
        .status(400)
        .json({ mensaje: "Usuario o contraseña incorrecta." });
    }

    const token = jwt.sign({ cedula: usuario.cedula }, "utnKey1234", {
      expiresIn: "5m",
    });

    return resp.status(200).json({
      token,
      role: usuario.rol,
      cedula: usuario.cedula,
    });
  };
}
export default UsuarioController;
