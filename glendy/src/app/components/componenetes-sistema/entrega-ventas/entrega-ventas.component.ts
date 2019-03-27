import { Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Compra } from '../../../models/compra';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { VentasService } from '../../../services/ventas.service';
import { MailCotizacionService } from '../../../services/mail.cotizacion.service';

@Component({
  selector: 'app-entrega-ventas',
  templateUrl: './entrega-ventas.component.html',
  styleUrls: ['./entrega-ventas.component.css']
})
export class EntregaVentasComponent implements OnInit, OnChanges {
  @Input() ventas : Compra[];
  @Output() Acciones = new EventEmitter();

  displayedColumns: string[] = ['nombre_receptor','paqueteria','tipo_envio', 'articulos','cantidad','calle_numero','municipio','ciudad_estado', 'c.p', 'pais', 'acciones'];
  dataSource: MatTableDataSource<Compra>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private ventasService: VentasService,
    private mailService : MailCotizacionService,
     private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.ventas);
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
    this.dataSource = new MatTableDataSource(this.ventas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  enviar(compra : Compra){
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      width: '250px',
      data: "Enviar paquete?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ventasService.enviarVenta(compra).subscribe(
          res => {
            this.mostrarMensaje("Envío Realizado");
            this.Acciones.emit();
            let correo = {
              destino: compra.usuario.email,
              asunto: 'Confirmación de envío',
              texto: '',
              html: '<h1> Confirmación de envío </h1> <p> Le informamos que su paquete que incluye: '+
                    '<ul>'+ this.productosAEnviarHTML(compra.productos)+  '</ul> ha sido enviado   </p>'
            }
            this.mailService.enviarEmail(correo).subscribe(res =>{
              console.log(res);
            });
          }
        )
      }
    });
  }

  private productosAEnviarHTML (productos): String {
    let html = '';
    for( let p of productos){
      html += '<li>'+p.producto.nombre_producto +'</li>'
    }
    return html;
  }

}
