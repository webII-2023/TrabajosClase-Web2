import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PersonajesResponse from '../models/PersonajesResponse';
import Personajes from '../models/Personaje';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  constructor(private http: HttpClient) {}

  getPersonajes(): Observable<PersonajesResponse> {
    return this.http.get<PersonajesResponse>(
      'https://rickandmortyapi.com/api/character'
    );
  }
}
