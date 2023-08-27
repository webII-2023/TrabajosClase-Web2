import { Licencia } from './licencia';

export interface Choferes {
  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNac: Date;
  estado: boolean;
  licencias: Licencia;
}
