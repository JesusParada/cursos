import { Component, OnInit } from '@angular/core';
import { DatosUsuariosService } from '../../../services/datos-usuarios.service';
import { Producto } from '../../../models/producto';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { ConfirmarVentaComponent } from '../confirmar-venta/confirmar-venta.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogoConfirmacionComponent } from '../../componenetes-sistema/dialogo-confirmacion/dialogo-confirmacion.component';

export interface Prod{
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  products : Prod[];
  displayedColumns: string[] = ['producto',"cantidad", 'precio_unitario',"precio","acciones"];

  ngOnInit(){
    this.getProductos();
  }

  constructor(private usuarioService: DatosUsuariosService,
    private route: ActivatedRoute,
     public  dialog : MatDialog,
     private snackBar: MatSnackBar){
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

  getProductos(){
    this.usuarioService.cargarCarrito();
    this.usuarioService.getCarrito().subscribe(productos => {
        let prod = [];
        console.log("PRODUCTOS :", productos);
        for(let p of productos){
          if(p != null)
          prod.push({ producto: p, cantidad: 1});
        }
        this.products = prod;
        console.log("PROD: ",this.products);
    }, error =>{
      this.mostrarMensaje("Error de servidor, intente más tarde");
    })
  }

  getTotalCost() {
    if(this.products != undefined){
      let total:number = 0;
        for(let p of this.products){
          total += p.cantidad * p.producto.precio_venta;
        }
        return total;
      }
    return 0;
  }
  comprar(){
        this.dialog.open(ConfirmarVentaComponent, {
          data: this.products
        });
  }

  eliminar (id : String){
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      width: '250px',
      data: "Estás seguro de querer eliminar el producto del carrito?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.usuarioService.eliminarDelCarrito(id).subscribe(
          res => {
            this.mostrarMensaje("Producto Eliminado");
            this.getProductos();
          }
        )
      }
    });

  }

}
