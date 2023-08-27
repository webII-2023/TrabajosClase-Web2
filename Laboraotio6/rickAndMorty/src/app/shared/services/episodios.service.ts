import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import EpisodiosResponse from '../models/EpisodiosResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EpisodiosService {
  constructor(private http: HttpClient) {}
  getEpisodios(): Observable<EpisodiosResponse> {
    return this.http.get<EpisodiosResponse>(
      'https://rickandmortyapi.com/api/episode'
    );
  }
}
