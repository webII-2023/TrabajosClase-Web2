import { Router } from 'express';
import UsuariosController from '../controller/UsuariosController';

const routes = Router();

routes.get('', UsuariosController.getAll);
routes.patch('', UsuariosController.update);
routes.delete('/:cedula', UsuariosController.delete);
routes.post('', UsuariosController.add);

export default routes;
