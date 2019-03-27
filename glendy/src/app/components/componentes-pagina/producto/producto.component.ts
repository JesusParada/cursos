import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../../models/producto';
import{DatosUsuariosService} from '../../../services/datos-usuarios.service';
import {AuthenticateService} from '../../../services/authenticate.service';
import {MatSnackBar, MatDialog} from '@angular/material';
import {VentasService} from '../../../services/ventas.service';
import { ConfirmarVentaComponent } from '../confirmar-venta/confirmar-venta.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {  
  @Input() producto : Producto;
  cargando : boolean = false;
  urlVideo :string = 'https://www.youtube.com/embed/JZltS4K9Ui0';
  urlSafe: SafeResourceUrl;

  constructor(private usuariosService: DatosUsuariosService, 
    public sanitizer: DomSanitizer,
    private auth : AuthenticateService, 
    public  dialog : MatDialog,
    private snackBar: MatSnackBar,
    private ventasService : VentasService) { }

  ngOnInit() {
    if(this.producto != undefined && this.producto.video){
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.producto.video);
    }else{
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlVideo);
    }
  }

  mostrarMensaje(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  agregarAlCarrito(){
    if(this.auth.isLoggedIn()){
      this.usuariosService.agregarAlCarrito(this.producto._id).subscribe( res => {
        this.mostrarMensaje("Agregado al carrito");
      }, err =>{
        this.mostrarMensaje("No se pudo agregar al carrito: "+ err.error);
      }
      )
    }else{
        this.mostrarMensaje("Debes iniciar sesión para agregar al carrito");
    }
  }

  comprar(){
    if(this.auth.isLoggedIn()){
        this.dialog.open(ConfirmarVentaComponent, {
          data: [{producto: this.producto, cantidad: 1}]
        });
    } else{
      this.mostrarMensaje("Debes iniciar sesión para comprar");
    }
  }

}
