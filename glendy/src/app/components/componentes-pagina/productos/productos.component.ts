import { Component, OnInit } from '@angular/core';
import {DatosProductosService} from '../../../services/datos-productos.service';
import { Producto } from '../../../models/producto';
import {ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar,
    private productosService : DatosProductosService) {
    if(route.snapshot.queryParamMap.has('cR') != null && route.snapshot.queryParamMap.get('cR') === 'true'){
      this.mostrarMensaje("Gracias por su compra!");
    }
   }

  mostrarMensaje(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
}

  ngOnInit() {
    this.getProductos();
  }

  getProductos(){
    this.productosService.getProductos().subscribe( res => {
      this.productosService.productos = res as Producto[];
    })
  }

}
