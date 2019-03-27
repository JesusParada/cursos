import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DatosComentariosService} from '../../../services/datos-comentarios.service';
import { Comentario } from '../../../models/comentario';
import { AuthenticateService } from '../../../services/authenticate.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css']
})
export class ComunidadComponent implements OnInit {
  private dudas : Observable<any[]>;
  private experiencias : Observable<any[]>;

  datos_comentario = new FormGroup({
    tipo : new FormControl('',[Validators.required]),
    texto : new FormControl('',[Validators.required])
  });
  constructor(private comentariosService : DatosComentariosService, 
    private snackBar: MatSnackBar,
    private authService: AuthenticateService) { }

  mostrarMensaje(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  ngOnInit() {
    this.getComentarios();
  }

  getComentarios(){
    this.dudas = this.comentariosService.getDudas();
    this.experiencias = this.comentariosService.getExperiencias();
    this.comentariosService.cargarComentarios();
  }

  agregarComentario(){
    if(this.authService.isLoggedIn()){
    this.comentariosService.postComentario(this.datos_comentario.value).subscribe(
      res => {
      this.getComentarios();
      this.mostrarMensaje("Comentario Agregado");
      }, err =>{
        this.mostrarMensaje("Ocurrió un error al agregar el comentario");
      });
    }else{
      this.mostrarMensaje("Debes iniciar sesión para comentar");
    }
  }
  reset(){
    this.datos_comentario.reset();
  }


}
