import Info from './Info';
import Personajes from './Personaje';

export default interface PersonajesResponse {
  info: Info;
  results: Personajes[];
}
