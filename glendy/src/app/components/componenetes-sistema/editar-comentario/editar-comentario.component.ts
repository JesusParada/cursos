import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Comentario } from '../../../models/comentario';

@Component({
  selector: 'app-editar-comentario',
  templateUrl: './editar-comentario.component.html',
  styleUrls: ['./editar-comentario.component.css']
})
export class EditarComentarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditarComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comentario) { }

  ngOnInit() {
  }

}
