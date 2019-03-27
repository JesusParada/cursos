import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { Usuario } from '../../../models/usuario';
import {AuthenticateService} from '../../../services/authenticate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,
    private authService : AuthenticateService,
    public  dialog : MatDialog, private auth: AuthenticateService,
    private snackBar: MatSnackBar) {}

  mostrarMensaje(message: string) {
      this.snackBar.open(message, "", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
  }

  ingresa() {
    this.dialog.open(LoginComponent, {});
  }

  cierraSesion(){
    this.auth.logout();
    this.mostrarMensaje("Ha cerrado sesión correctamente");
  }

  datosUsuario(){
    return this.auth.getUserDetails();  
  }
  
}

