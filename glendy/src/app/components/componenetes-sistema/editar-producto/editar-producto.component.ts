import { Component, OnInit, Inject } from '@angular/core';
import { ImagenesService } from '../../../services/imagenes.service';
import { DatosProductosService } from '../../../services/datos-productos.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { Producto } from '../../../models/producto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  cambioImagen : boolean = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  producto_data = new FormGroup({
    nombre : new FormControl(this.data.nombre_producto, [Validators.required]),
    tipo : new FormControl(this.data.tipo_producto,[Validators.required]),
    descripcion : new FormControl(this.data.descripcion,[Validators.required]),
    precio_costo : new FormControl(this.data.precio_costo, [Validators.required, Validators.min(10)]),
    precio_venta : new FormControl(this.data.precio_venta,[Validators.required]),
    existencia : new FormControl(this.data.existencia,[Validators.required]),
    video:new FormControl(this.data.video,Validators.required),
    largo: new FormControl(this.data.largo,Validators.required),
    alto: new FormControl(this.data.alto,Validators.required),
    ancho: new FormControl(this.data.ancho,Validators.required),
    peso: new FormControl(this.data.peso,Validators.required)
  });

  constructor(private imagenService : ImagenesService,
    private snackBar: MatSnackBar,
     private productoService : DatosProductosService, 
    public dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto) {}

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
      this.data.contenido.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }
  
  remove(contenido: String): void {
    const index = this.data.contenido.indexOf(contenido);
    if (index >= 0) {
      this.data.contenido.splice(index, 1);
    }
  }

  activarBoton ():boolean{
    return this.producto_data.invalid || this.data.contenido.length == 0;
  }
  
  cargarArchivo(evt){
    let label = document.getElementById("labelProducto");
    if(evt.target.files.length >0){
      label.setAttribute("value",evt.target.files[0].name);
      this.cambioImagen = true;
    }
  }
  
  guardar(){
    if(this.cambioImagen){
      let img: any = document.getElementById("fileToUpload");
      let form = new FormData();
      form.append('file',img.files[0]);
      this.imagenService.subirImagen(form).subscribe(
        resp => {
            if(resp.path_imagen){
              this.editar(resp.path_imagen);
            } else{
              alert("No se cargo la imagen");
            }
        })
    } else{
      this.editar("");
    }
  }

  private editar(path_imagen: String){
    let producto = new Producto();
      producto._id = this.data._id;
      producto.nombre_producto = this.producto_data.get("nombre").value;
      producto.tipo_producto = this.producto_data.get("tipo").value;
      producto.descripcion = this.producto_data.get("descripcion").value;
      producto.contenido = this.data.contenido;
      producto.precio_venta = this.producto_data.get("precio_venta").value;
      producto.precio_costo = this.producto_data.get("precio_costo").value;
      producto.existencia = this.producto_data.get("existencia").value;
      producto.video = this.producto_data.get("video").value;
      producto.largo = this.producto_data.get("largo").value;
      producto.alto = this.producto_data.get("alto").value;
      producto.ancho = this.producto_data.get("ancho").value;
      producto.peso = this.producto_data.get("peso").value;
      if(path_imagen.length>0){
        producto.imagenes = [path_imagen];
      }else{
        producto.imagenes = this.data.imagenes;
      }
      console.log(producto);
      this.productoService.putProducto(producto).subscribe(
        resp => {
          console.log(resp.status);
          if(resp.status= 200){
            this.mostrarMensaje("Producto Actualizado");
            this.producto_data.reset();
            this.dialogRef.close(producto);
          }else{
            this.mostrarMensaje("Error al actualizar el producto");
          }
          
        }
      )
  }

}
