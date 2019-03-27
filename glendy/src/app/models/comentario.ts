import { text } from "@angular/core/src/render3/instructions";
import { Usuario } from "./usuario";

export class Comentario{
constructor(){
    this._id ='';
    this.usuario = new Usuario();
    this.texto = '';
}

    _id :string;
    tipo: string;
    usuario: Usuario;
    texto: String;
    fecha: Date;
    respuesta: String
}