import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  items : Array<any> = [];
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor() { 
    this.items = [
      { name : "assets/imagenes/glendy.JPG", leyenda:"Glendy, el paquete completo"},
      { name : "assets/imagenes/memorama.JPG", leyenda:"El memorama de Glendy"},
      { name : "assets/imagenes/loteria.JPG", leyenda:"La lotería de Glendy"},
      { name : "assets/imagenes/cuentos.JPG", leyenda:"Los cuentos de Glendy"},
      { name : "assets/imagenes/rompecabezas.JPG", leyenda:"Los rompecabezas de Glendy"},
      { name : "assets/imagenes/serpientes.JPG", leyenda:"Serpientes y escaleras Glendy"},
      { name : "assets/imagenes/tarjetas.JPG", leyenda:"Las tarjetas de categorías de Glendy"},
      { name : "assets/imagenes/adivina.JPG", leyenda:"Adivina qué dice de Glendy"}
    ];
  }

  ngOnInit() {
  }

}
