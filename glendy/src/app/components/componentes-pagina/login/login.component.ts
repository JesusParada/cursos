import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { DatosUsuariosService } from '../../../services/datos-usuarios.service';
import { Usuario } from '../../../models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LoginResponse } from '../../../models/loginResponse';
import {AuthenticateService} from '../../../services/authenticate.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  user : Usuario;
  hide = true;
  usuario : Usuario;
  mensaje : String ="";

  datos_login = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required])
  });

  datos_usuario = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    nombre_usuario : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required, Validators.minLength(2)]),
    confirm_password : new FormControl('',[Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
     private auth : AuthenticateService,
    private snackBar : MatSnackBar) {}
  
  mostrarMensaje(message: string) {
      this.snackBar.open(message, "", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
  }
  
  validadorPassword(){
    return this.datos_usuario.get('password').value === this.datos_usuario.get('confirm_password').value;
  }

  getLoginErrorMessage() {
    return this.datos_login.get('email').hasError('required') ? 'No ha ingresado correo' :
        this.datos_login.get('email').hasError('email') ? 'No es un correo válido' :
            this.datos_login.get('password').invalid? 'No ha ingresado contraseña': '';
  }

  getRegisterErrorMessage() {
    return this.datos_usuario.get('email').hasError('required') ? 'No ha ingresado correo' :
        this.datos_usuario.get('email').hasError('email') ? 'No es un correo válido' :
        this.datos_usuario.get('nombre_usuario').hasError('required') ? 'No ha ingresado nombre de usuario' :
        this.datos_usuario.get('password').invalid? 'Contraseña inválida': 
        this.datos_usuario.get('confirm_password').invalid || !this.validadorPassword() ? 'No coinciden las contraseñas':'';
  }

  reset(){
    this.datos_login.reset();
  }

  login(){
    this.user = new Usuario();
    this.user.email = this.datos_login.get('email').value,
    this.user.password = this.datos_login.get('password').value
    this.auth.login(this.user)
    .subscribe(
      res =>{
        this.mostrarMensaje(res.message);
        this.close();
      }, err =>{
        this.mostrarMensaje(err.error.message);
      }
    );
  }

  registro(){
    let usuario = new Usuario();
    usuario.email = this.datos_usuario.get('email').value;
    usuario.password = this.datos_usuario.get('password').value;
    usuario.nombre_usuario = this.datos_usuario.get('nombre_usuario').value;
    usuario.tipo = "Cliente";
    this.auth.register(usuario).subscribe(
      res => {
        this.mostrarMensaje(res.message);
        this.close();
      }, err =>{
        console.log(err);
        this.mostrarMensaje(err.error.message);
      }
      );
  }

  /*
  registro(){
    this.usuario = new Usuario();
    this.usuario.email = this.datos_usuario.get('email').value;
    this.usuario.password = this.datos_usuario.get('password').value;
    this.usuario.nombre_usuario = this.datos_usuario.get('nombre_usuario').value;
    this.usuario.tipo = 'Cliente';
    this.usuariosService.postUsuario(this.usuario).subscribe(
      res => {
        console.log(res.toString);
        let response = res as LoginResponse;
        console.log(response.mensaje);
        this.data = res as Usuario;
        this.dialogRef.close(this.data);
      });
  }*/

  close(): void {
    this.dialogRef.close();
  }

}
