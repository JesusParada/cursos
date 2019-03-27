import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Producto } from '../models/producto';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DatosProductosService {

  productos : Producto[];
  private productosSubject = new BehaviorSubject([]);
  readonly URL_API = 'http://localhost:3000/api/productos';

  constructor(private httpClient : HttpClient, private auth : AuthenticateService) {
    console.log("Servicio funcionando");
  }
  getProductos2(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }
  private setProductos(productos : Producto[]){
    this.productos = productos;
    this.refreshProductos();
  }
  private refreshProductos(){
    this.productosSubject.next(this.productos);
  }

  cargarProductos(){
    this.httpClient.get(this.URL_API).subscribe(res =>{
      this.setProductos(res as Producto[]);
    });
  }

  getProductos(){
    return this.httpClient.get(this.URL_API);
  }

  postProducto(producto : Producto){
    return this.httpClient.post(this.URL_API, producto,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  putProducto(producto : Producto): Observable<any>{
    return this.httpClient.put(this.URL_API + `/${producto._id}`, producto,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  deleteProducto(_id : String){
    return this.httpClient.delete(this.URL_API + `/${_id}`,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }


}
