import {Component, OnInit, ViewChild, Input, OnChanges} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Compra } from '../../../models/compra';

@Component({
  selector: 'app-ventas-totales',
  templateUrl: './ventas-totales.component.html',
  styleUrls: ['./ventas-totales.component.css']
})
export class VentasTotalesComponent  implements OnInit, OnChanges {
  @Input() ventas : Compra[];
  displayedColumns: string[] = ['_id', 'total_articulos','subtotal','costo_envio','total', 'entregado'];
  dataSource: MatTableDataSource<Compra>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.ventas);
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

  subtotal(compra : Compra){  
    let sub:number = 0;
    for(let p of compra.productos){
      sub += p.producto.precio_venta * p.cantidad;
    }
    return sub;
  } 
  total(compra : Compra){
    let tot = compra.costo_envio;
    for(let p of compra.productos){
      tot += p.producto.precio_venta * p.cantidad;
    }
    return tot;
  } 

}

