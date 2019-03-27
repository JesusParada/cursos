import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Usuario } from '../models/usuario';
import {Producto} from '../models/producto';
import { Observable,BehaviorSubject } from 'rxjs';
import {AuthenticateService} from './authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class DatosUsuariosService {
  private clientesSubject = new BehaviorSubject([]);
  private empleadosSubject = new BehaviorSubject([]);
  private productosCarritoSubject = new BehaviorSubject([]);
  selectedUsuario : Usuario;
  usuarios_clientes : Usuario[];
  usuarios_empleados: Usuario[];
  productos_carrito : Producto[];
  readonly URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private httpClient: HttpClient, private auth: AuthenticateService) {
    this.selectedUsuario = new Usuario();
  }
  
  getClientes(): Observable<Usuario[]> {
    return this.clientesSubject.asObservable();
  }

  getEmpleados(): Observable<Usuario[]> {
    return this.empleadosSubject.asObservable();
  }

  getCarrito(): Observable<Producto[]>{
    return this.productosCarritoSubject.asObservable();
  }

  private setClientes(usuario : Usuario[]){
    this.usuarios_clientes = usuario;
    this.refreshClientes();
  }

  private setEmpleados(usuario : Usuario[]){
    this.usuarios_empleados =  usuario;
    this.refreshEmpleados();
  }

  private setProductosCarrito(productos: Producto[]){
    this.productos_carrito = productos;
    this.refreshProductosCarrito();
  }

  private refreshEmpleados() {
    // Emitir los nuevos valores para que todos los que dependan se actualicen.
    this.empleadosSubject.next(this.usuarios_empleados);
  }

  private refreshClientes(){
    this.clientesSubject.next(this.usuarios_clientes);
  }

  private refreshProductosCarrito(){
    this.productosCarritoSubject.next(this.productos_carrito);
  }

  cargarCarrito(){
    this.getProductosCarrito().subscribe( res => {
      this.setProductosCarrito( res as Producto[]);
    })
  }
 
  cargarUsuarios(){
    let usuarios : Usuario[];
    let clientes = new Array<Usuario>();
    let empleados = new Array<Usuario>();
    this.httpClient.get(this.URL_API).subscribe(res =>{
      usuarios = res as Usuario[];
      for(let usuario of usuarios){
        if(usuario.tipo === "Cliente"){
          clientes.push(usuario);
        }
        else{
          empleados.push(usuario);
        }
      }
      this.setClientes(clientes);
      this.setEmpleados(empleados);
    });
  }

  getUsuarios(){
    return this.httpClient.get(this.URL_API,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  putUsuario(usuario : Usuario){
    return this.httpClient.put(this.URL_API + `/${usuario._id}`, usuario,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  deleteUsuario(_id : String){
    return this.httpClient.delete(this.URL_API + `/${_id}`,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  agregarAlCarrito(id: String):Observable<any>{
    return this.httpClient.post(this.URL_API+"/carrito/",{id_producto : id},{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  eliminarDelCarrito (id: String) : Observable <any>{
    return this.httpClient.delete(this.URL_API+"/carrito/"+id ,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  getProductosCarrito(){
    return this.httpClient.get(this.URL_API+"/carrito/",{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  }