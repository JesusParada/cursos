import { Component, OnInit } from '@angular/core';
import {DatosProductosService} from '../../../services/datos-productos.service';
import { Producto } from '../../../models/producto';
import { Usuario } from '../../../models/usuario';
import { DatosUsuariosService } from '../../../services/datos-usuarios.service';
import { Observable } from 'rxjs';
import { DatosComentariosService } from '../../../services/datos-comentarios.service';
import { VentasService } from '../../../services/ventas.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {
  private empleados: Observable<any[]>;
  private clientes: Observable<any[]>;
  private dudas : Observable<any[]>;
  private experiencias : Observable<any[]>;
  private ventas : Observable<any[]>;
  private ventasSinEnviar: Observable<any[]>;

  constructor(private productosService : DatosProductosService, 
            private usuariosService: DatosUsuariosService, 
            private comentariosService : DatosComentariosService,
            private ventasService: VentasService) {
   }

  ngOnInit() {
    this.getProductos();
    this.getUsuarios();
    this.getComentarios();
    this.getVentas();
  }

  getProductos(){
    this.productosService.getProductos().subscribe( res => {
      this.productosService.productos = res as Producto[];
    })
  }

  getUsuarios(){
    this.clientes = this.usuariosService.getClientes();
    this.empleados = this.usuariosService.getEmpleados();
    this.usuariosService.cargarUsuarios();
  }

  getVentas(){
    this.ventas = this.ventasService.getVentas();
    this.ventasSinEnviar = this.ventasService.getVentasSinEnviar();
    this.ventasService.cargarVentas();
  }

  getComentarios(){
    this.dudas = this.comentariosService.getDudas();
    this.experiencias = this.comentariosService.getExperiencias();
    this.comentariosService.cargarComentarios();
  }

  actualizarVentas(){
    this.getVentas();
  }

  actualizarUsuarios(){
    this.getUsuarios();
  }
  actualizarComentarios(){
    this.getComentarios();
  }

}
