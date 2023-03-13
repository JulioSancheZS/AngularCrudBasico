import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../Interfaces/product';

//Servicios

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //Declaramos la variable para traer la ruta de la api
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/productos/'
  }

  //Obtener listado
  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  //Eliminar
  deleteProduct(id: number): Observable<void>{
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl} ${id}`)
  }
//agregar
  saveProduct(product: Product): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product)
  }

  //para traer los datos para editar
  getProductbyId(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl} ${id}`)
  }

  //Actualizar
  updateProduct(id: number, product: Product): Observable<void>{
   return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl} ${id}`, product)
  }
}
