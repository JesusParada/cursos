import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from './authenticate.service';
import { Producto } from '../models/producto';
import { Observable, BehaviorSubject } from 'rxjs';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private ventasSubject = new BehaviorSubject([]);
  private ventasSinEnviarSubject = new BehaviorSubject([]);
  ventas: Compra[];
  ventasSinEnviar: Compra[];

  readonly URL_API = 'http://localhost:3000/api/ventas/';

  constructor(private httpClient: HttpClient, private auth: AuthenticateService) {
    
   }
  enviarVenta (compra : Compra){
    return this.httpClient.put(this.URL_API+"enviar/"+compra._id, compra);
  }

  crearVenta(compra: Compra):Observable<any>{
    return this.httpClient.post(this.URL_API , compra , { headers:{ Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  getVentas(): Observable<Compra[]> {
    return this.ventasSubject.asObservable();
  }

  getVentasSinEnviar(): Observable<Compra[]>{
    return this.ventasSinEnviarSubject.asObservable();
  }

  private setVentas(ventas : Compra[]){
    this.ventas = ventas;
    this.refreshVentas();
  }

  private setVentasSinEnviar(ventas : Compra[]){
    this.ventasSinEnviar = ventas;
    this.refreshVentasSinEnviar();
  }

  private refreshVentas(){
    this.ventasSubject.next(this.ventas);
  }

  private refreshVentasSinEnviar(){
    this.ventasSinEnviarSubject.next(this.ventasSinEnviar);
  }

  cargarVentas(){
    let ventas = new Array<Compra>();
    let ventasSinEnviar = new Array<Compra>();
    this.httpClient.get(this.URL_API, { headers:{ Authorization: `Bearer ${this.auth.getToken()}` }}).subscribe(res =>{
      ventas = res as Compra[];
      for(let v of ventas){
        if(v.entregado === false)
          ventasSinEnviar.push(v);
      }
      this.setVentas(ventas);
      this.setVentasSinEnviar(ventasSinEnviar);
      console.log(ventasSinEnviar);
    });
  }

}
