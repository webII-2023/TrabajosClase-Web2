import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Productos } from '../models/productos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Productos[]> {
    return this.http.get<Productos[]>('http://localhost:3000/productos');
  }
  guardar(producto: Productos): Observable<Productos> {
    return this.http
      .post<Productos>('http://localhost:3000/productos', producto)
      .pipe(cathError(this.handleError));
  }
  handleError(error: any): Observable<never> {
    console.log(error);
    return throwError(error);
  }
}
function cathError(
  handleError: (error: any) => Observable<never>
): import('rxjs').OperatorFunction<Productos, Productos> {
  throw new Error('Function not implemented.');
}
