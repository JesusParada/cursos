import {Component, OnInit, ViewChild, Input, OnChanges} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { Compra } from '../../../models/compra';
import {GraficaPastelComponent} from '../grafica-pastel/grafica-pastel.component';



export interface ventaProducto {
  id_producto: string;
  nombre_producto : string;
  total_vendidos : number;
}

@Component({
  selector: 'app-ventas-productos',
  templateUrl: './ventas-productos.component.html',
  styleUrls: ['./ventas-productos.component.css']
})
export class VentasProductosComponent implements OnInit, OnChanges {

  @Input() ventas : Compra[];
  ventasProductos : ventaProducto[] = [];

  displayedColumns: string[] = ['_id','nombre_producto','total_articulos'];
  dataSource: MatTableDataSource<ventaProducto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.ventasProductos);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.ventasProductos = [];
    if(this.ventas != undefined){
      for(let venta of this.ventas){
        for(let producto of venta.productos){
          let agregado = false;
          for(let vp of this.ventasProductos){
            if(vp.id_producto === producto.producto._id){
              vp.total_vendidos += producto.cantidad;
              agregado = true;
            }
          }
          if(!agregado){
            this.ventasProductos.push({
              id_producto : producto.producto._id.toString(),
              nombre_producto: producto.producto.nombre_producto.toString(),
              total_vendidos: producto.cantidad
            })
          }
        }
      }
    }
  }

  ngOnChanges(){
    this.ventasProductos = [];
    if(this.ventas != undefined){
      for(let venta of this.ventas){
        for(let producto of venta.productos){
          let agregado = false;
          for(let vp of this.ventasProductos){
            if(vp.id_producto === producto.producto._id){
              vp.total_vendidos += producto.cantidad;
              agregado = true;
            }
          }
          if(!agregado){
            this.ventasProductos.push({
              id_producto : producto.producto._id.toString(),
              nombre_producto: producto.producto.nombre_producto.toString(),
              total_vendidos: producto.cantidad
            })
          }
        }
      }
    }
    this.dataSource = new MatTableDataSource(this.ventasProductos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generarGrafica(){
    const dialogRef = this.dialog.open(GraficaPastelComponent, {
      width: '500px',
      data: this.ventasProductos
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
      }
    });
  }
  
}
