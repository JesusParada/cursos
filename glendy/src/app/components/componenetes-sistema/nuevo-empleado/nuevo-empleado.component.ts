import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthenticateService} from '../../../services/authenticate.service';
import { Usuario } from '../../../models/usuario';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css']
})
export class NuevoEmpleadoComponent implements OnInit {
@Output() Agregado = new EventEmitter();

  hide : boolean = true;

  constructor(private auth : AuthenticateService, private snackBar: MatSnackBar) { }

  mostrarMensaje(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  ngOnInit() {
  }

  datos_usuario = new FormGroup({
    tipo : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    nombre_usuario : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required, Validators.minLength(2)]),
    confirm_password : new FormControl('',[Validators.required])
  });

  validadorPassword(){
    return this.datos_usuario.get('password').value === this.datos_usuario.get('confirm_password').value;
  }

  getRegisterErrorMessage() {
    return this.datos_usuario.get('email').hasError('required') ? 'No ha ingresado correo' :
        this.datos_usuario.get('email').hasError('email') ? 'No es un correo válido' :
        this.datos_usuario.get('nombre_usuario').hasError('required') ? 'No ha ingresado nombre de usuario' :
        this.datos_usuario.get('password').invalid? 'Contraseña inválida': 
        this.datos_usuario.get('confirm_password').invalid || !this.validadorPassword() ? 'No coinciden las contraseñas':'';
  }
  reset(){
    this.datos_usuario.reset();
  }

  registro(){
    let usuario = new Usuario();
    usuario.email = this.datos_usuario.get('email').value;
    usuario.password = this.datos_usuario.get('password').value;
    usuario.nombre_usuario = this.datos_usuario.get('nombre_usuario').value;
    usuario.tipo = this.datos_usuario.get("tipo").value;
    this.auth.register(usuario).subscribe(
      res => {
        console.log(res);
        this.mostrarMensaje("Usuario Agregado");
        this.Agregado.emit();
      });
  }

}
