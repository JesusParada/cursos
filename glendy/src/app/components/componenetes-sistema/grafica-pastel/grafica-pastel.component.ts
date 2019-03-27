import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatSnackBar } from '@angular/material';
import {ventaProducto} from '../ventas-productos/ventas-productos.component';

@Component({
  selector: 'app-grafica-pastel',
  templateUrl: './grafica-pastel.component.html',
  styleUrls: ['./grafica-pastel.component.css']
})
export class GraficaPastelComponent implements OnInit{
  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  public constructor(@Inject(MAT_DIALOG_DATA) public data: ventaProducto[]){

  }

  ngOnInit(){
    let labels = [];
    let datos = [];
    for(let vP of this.data){
      labels.push(vP.nombre_producto);
      datos.push(vP.total_vendidos);
    }
    this.doughnutChartLabels = labels;
    this.doughnutChartData = datos;

  }
  
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
