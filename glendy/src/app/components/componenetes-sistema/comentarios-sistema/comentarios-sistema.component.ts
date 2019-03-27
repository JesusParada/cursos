import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Comentario } from '../../../models/comentario';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Usuario } from '../../../models/usuario';
import { DatosUsuariosService } from '../../../services/datos-usuarios.service';
import { DatosComentariosService } from '../../../services/datos-comentarios.service';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { EditarComentarioComponent } from '../editar-comentario/editar-comentario.component';


@Component({
  selector: 'app-comentarios-sistema',
  templateUrl: './comentarios-sistema.component.html',
  styleUrls: ['./comentarios-sistema.component.css']
})
export class ComentariosSistemaComponent implements OnInit {
  @Input() comentarios : Comentario[];
  @Output() Acciones = new EventEmitter();

  displayedColumns: string[] = ['nombre_usuario', 'tipo_comentario','texto', 'acciones'];
  dataSource: MatTableDataSource<Comentario>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private comentariosService : DatosComentariosService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.comentarios);
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
    this.dataSource = new MatTableDataSource(this.comentarios);
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
      data: "Estás seguro de querer eliminar el comentario?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.comentariosService.deleteComentario(id).subscribe(
          res => {
            this.mostrarMensaje("Comentario Eliminado");
            this.Acciones.emit();
          }
        )
      }
    });

  }

  editar(comentario : Comentario){
    const dialogRef = this.dialog.open(EditarComentarioComponent, {
      width: '500px',
      data: comentario
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.comentariosService.putComentario(result).subscribe( res =>{
          this.mostrarMensaje("Comentario Respondido");
        }); 
      }
    });
  }

}
