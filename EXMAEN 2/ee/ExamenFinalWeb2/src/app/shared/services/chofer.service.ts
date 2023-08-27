import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Choferes } from '../models/chofer';

@Injectable({
  providedIn: 'root',
})
export class ChoferService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Choferes[]> {
    return this.http
      .get<Choferes[]>('http://localhost:3000/chofer')
      .pipe(catchError(this.handlerError));
  }
  guardar(choferes: Choferes): Observable<Choferes> {
    return this.http
      .post<Choferes>('http://localhost:3000/chofer', choferes)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido, reporte al adminstrador.';

    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }

    return throwError(() => new Error(mensaje));
  }
}
