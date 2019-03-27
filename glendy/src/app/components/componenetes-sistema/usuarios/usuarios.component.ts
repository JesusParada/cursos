import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog} from '@angular/material';
import { Usuario } from '../../../models/usuario';
import { DatosUsuariosService } from '../../../services/datos-usuarios.service';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnChanges {
  @Input() usuarios : Usuario[];
  @Output() Acciones = new EventEmitter();

  displayedColumns: string[] = ['nombre_usuario', 'email', 'tipo', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuariosService : DatosUsuariosService,
    private dialog : MatDialog,
     private snackBar : MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

  mostrarMensaje(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: String){
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      width: '250px',
      data: "Estás seguro de querer eliminar el usuario?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.usuariosService.deleteUsuario(id).subscribe(
          res => {
            this.mostrarMensaje("Usuario Eliminado");
            this.Acciones.emit();
          }
        )
      }
    });


  }
}

