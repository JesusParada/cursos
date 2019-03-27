import {Component, OnInit, ViewChild, Input, OnChanges} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Compra } from '../../../models/compra';

export interface ventaMes {
  mes: string;
  anio: string;
  total_vendidos : number;
  total_ventas: number;
}

@Component({
  selector: 'app-ventas-mes',
  templateUrl: './ventas-mes.component.html',
  styleUrls: ['./ventas-mes.component.css']
})
export class VentasMesComponent implements OnInit,OnChanges {
  @Input() ventas : Compra[];
  ventasProductos : ventaMes[] = [];

  displayedColumns: string[] = ['anio','mes','total_vendidos','total_ventas'];
  dataSource: MatTableDataSource<ventaMes>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.ventasProductos);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargarVentasMes();    
  }
  
  ngOnChanges(){
    this.cargarVentasMes();
    this.dataSource = new MatTableDataSource(this.ventasProductos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarVentasMes(){
    let opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    this.ventasProductos = [];
    if(this.ventas != undefined){
      for(let venta of this.ventas){
        let fecha : Date = new Date(venta.fecha);
        let fechaString = fecha.toLocaleDateString('es-MX', opciones);
        let mes = fechaString.split(',')[1].split(' ')[3];
        let anio = fechaString.split(',')[1].split(' ')[5];
        let agregado = false;
        let total_vendidos = 0;
        let total_ventas = 0;
        for(let producto of venta.productos){
          total_vendidos += producto.cantidad;
          total_ventas += producto.cantidad * producto.producto.precio_venta;
        }
        for(let vp of this.ventasProductos){
          if(vp.mes === mes && vp.anio === anio){
            agregado = true;
            vp.total_vendidos += total_vendidos;
            vp.total_ventas += total_ventas;
          }
        } 
        if(!agregado){
          this.ventasProductos.push({
          mes : mes,
          anio: anio,
          total_ventas: total_ventas,
          total_vendidos: total_vendidos
          })
        }
      }
    }
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
