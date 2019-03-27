import { Component, OnInit, Inject } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {ImagenesService} from '../../../services/imagenes.service';
import {DatosProductosService} from '../../../services/datos-productos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})

export class NuevoProductoComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  listaContenido: String[]=[];

  producto_data = new FormGroup({
    nombre : new FormControl('', [Validators.required]),
    tipo : new FormControl('',[Validators.required]),
    descripcion : new FormControl('',[Validators.required]),
    contenido : new FormControl('',[Validators.required]),
    precio_costo : new FormControl('', [Validators.required]),
    precio_venta : new FormControl('',[Validators.required]),
    existencia : new FormControl('',[Validators.required]),
    video:new FormControl('',Validators.required),
    largo: new FormControl('',Validators.required),
    alto: new FormControl('',Validators.required),
    ancho: new FormControl('',Validators.required),
    peso: new FormControl('',Validators.required)
  });

  constructor(private imagenService : ImagenesService,private snackBar: MatSnackBar, private productoService : DatosProductosService) { }

  mostrarMensaje(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.listaContenido.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(contenido: String): void {
    const index = this.listaContenido.indexOf(contenido);
    if (index >= 0) {
      this.listaContenido.splice(index, 1);
    }
  }

  cargarArchivo(evt){
    let label = document.getElementById("labelProducto");
    if(evt.target.files.length >0)
      label.setAttribute("value",evt.target.files[0].name);
  }

  guardar(){
    let img: any = document.getElementById("fileToUpload");
    let path : any;
    console.log(this.listaContenido);
    if(img.files.length > 0){
      let form = new FormData();
      form.append('file',img.files[0]);
      this.imagenService.subirImagen(form).subscribe(
        resp => {
          if(resp.path_imagen){
            let producto = new Producto();
            producto.nombre_producto = this.producto_data.get("nombre").value;
            producto.tipo_producto = this.producto_data.get("tipo").value;
            producto.descripcion = this.producto_data.get("descripcion").value;
            producto.contenido = this.listaContenido;
            producto.precio_venta = this.producto_data.get("precio_venta").value;
            producto.precio_costo = this.producto_data.get("precio_costo").value;
            producto.existencia = this.producto_data.get("existencia").value;
            producto.imagenes = [resp.path_imagen];
            producto.video = this.producto_data.get("video").value;
            producto.largo = this.producto_data.get("largo").value;
            producto.alto = this.producto_data.get("alto").value;
            producto.ancho = this.producto_data.get("ancho").value;
            producto.peso = this.producto_data.get("peso").value;
            
            console.log(producto);
            this.productoService.postProducto(producto).subscribe(
              resp => {
                this.mostrarMensaje("Producto Agregado Correctamente");
                console.log(resp);
                this.producto_data.reset();
              }
            )

          }
        },
        error => {
          this.mostrarMensaje('Imagen supera el tamaño permitido');
        }
      );
  }
  
}
}
