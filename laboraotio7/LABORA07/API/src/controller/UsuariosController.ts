import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuarios } from '../entity/Usuario';
import { validate } from 'class-validator';
import { errorMonitor } from 'events';

class UsuariosController {
  static add = async (req: Request, resp: Response) => {
    try {
      const { cedula, nombre, apellido1, apellido2, correo, rol, contrasena } =
        req.body;

      const fecha = new Date();
      let usuarios = new Usuarios();
      usuarios.cedula = cedula;
      usuarios.nombre = nombre;
      usuarios.apellido1 = apellido1;
      usuarios.apellido2 = apellido2;
      usuarios.fecha_ingreso = fecha;
      usuarios.correo = correo;
      usuarios.contrasena = contrasena;
      usuarios.rol = rol;
      usuarios.estado = true;

      const repositorioUsuario = AppDataSource.getRepository(Usuarios);
      let Correo = await repositorioUsuario.findOne({
        where: { cedula: cedula, estado: true },
      });
      if (Correo) {
        return resp.status(400).json({ mensaje: 'Usuario ya existente' });
      }

      Correo = await repositorioUsuario.findOne({ where: { correo: correo } });
      if (Correo) {
        return resp.status(400).json({ mensaje: 'Correo de usuario en uso' });
      }
      try {
        await repositorioUsuario.save(usuarios);
        return resp.status(201).json({ mensaje: 'Usuario creado con exito' });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: 'Error desconocido.' });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const {
      cedula,
      nombre,
      apellido1,
      apellido2,
      fecha_ingreso,
      correo,
      rol,
      contrasena,
    } = req.body;

    const repositorioUsuario = AppDataSource.getRepository(Usuarios);
    let UsuariosR: Usuarios;
    try {
      UsuariosR = await repositorioUsuario.findOneOrFail({ where: { cedula } });
    } catch (error) {
      return resp
        .status(404)
        .json({ mensaje: 'El usuario ya esta registrado' });
    }

    UsuariosR.nombre = nombre;
    UsuariosR.apellido1 = apellido1;
    UsuariosR.apellido2 = apellido2;
    UsuariosR.fecha_ingreso = fecha_ingreso;
    UsuariosR.correo = correo;
    UsuariosR.rol = rol;
    UsuariosR.contrasena = contrasena;

    try {
      await repositorioUsuario.save(UsuariosR);
      return resp.status(200).json({ mensaje: 'Usuario modificado con exito' });
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: 'Error al modificar el usuario' });
    }
  };

  static getAll = async (req: Request, resp: Response) => {
    try {
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      const listaUsuario = await repoUsuario.find({ where: { estado: true } });

      if (listaUsuario.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: 'No hay registros de usuarios' });
      }

      return resp.status(200).json(listaUsuario);
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: 'Error desconocido. PAGUE 50MIL DOLARES' });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const cedula = req.params['cedula'];
      if (!cedula) {
        return resp.status(404).json({ mensaje: 'La cedula no fue indicada' });
      }

      const UsuariosRepo = AppDataSource.getRepository(Usuarios);
      let usuarios: Usuarios;
      try {
        usuarios = await UsuariosRepo.findOneOrFail({
          where: { cedula, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No se encuentra el usuario con esa cedula' });
      }

      usuarios.estado = false;
      try {
        await UsuariosRepo.save(usuarios);
        return resp.status(200).json({ mensaje: 'Se eliminó correctamente' });
      } catch (error) {
        return resp.status(400).json({ mensaje: 'No se pudo eliminar.' });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };
}
export default UsuariosController;
