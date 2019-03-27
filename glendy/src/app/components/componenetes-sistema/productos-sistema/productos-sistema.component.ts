import { Component, OnInit ,ViewChild, Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import { Producto } from '../../../models/producto';
import {DatosProductosService} from '../../../services/datos-productos.service';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-productos-sistema',
  templateUrl: './productos-sistema.component.html',
  styleUrls: ['./productos-sistema.component.css']
})
export class ProductosSistemaComponent implements OnInit {
  @Input() producto : Producto;
  url = 'https://www.youtube.com/embed/JZltS4K9Ui0';
  urlSafe: SafeResourceUrl;
  
  visible : boolean = true;
  constructor(private productoServicio: DatosProductosService,
    private snackBar: MatSnackBar,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog) {
    }

  mostrarMensaje(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  remove(){
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      width: '250px',
      data: "Estás seguro de querer eliminar "+ this.producto.nombre_producto+ " ?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.productoServicio.deleteProducto(this.producto._id).subscribe(
          res => {
            this.mostrarMensaje("Producto Eliminado");
            console.log(res);
            this.visible = false;
          }
        )
      }
    });
  }
  
  editar(){
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '500px',
      data: this.producto
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.producto = result;
        console.log(result);
      }
    });
  }



}
