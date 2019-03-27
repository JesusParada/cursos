import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../../../models/comentario';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() comentario: Comentario;
  fecha: String;
  opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  constructor() { }

  ngOnInit() {
    let fecha : Date = new Date(this.comentario.fecha);
    this.fecha = fecha.toLocaleDateString('es-MX', this.opciones);
  }

}
