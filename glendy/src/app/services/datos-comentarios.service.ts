import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario';
import {AuthenticateService} from './authenticate.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DatosComentariosService {
  private dudasSubject = new BehaviorSubject([]);
  private experienciasSubject = new BehaviorSubject([]);
  dudas : Comentario[];
  experiencias: Comentario[];

  readonly URL_API = 'http://localhost:3000/api/comentarios';

  constructor(private httpClient: HttpClient, private auth : AuthenticateService) {
   }

  getDudas(): Observable<Comentario[]> {
    return this.dudasSubject.asObservable();
  }

  getExperiencias(): Observable<Comentario[]> {
    return this.experienciasSubject.asObservable();
  }

  private setDudas(comentarios : Comentario[]){
    this.dudas = comentarios;
    this.refreshDudas();
  }

  private setExperiencias(comentarios : Comentario[]){
    this.experiencias =  comentarios;
    this.refreshExperiencias();
  }

  private refreshExperiencias() {
    this.experienciasSubject.next(this.experiencias);
  }

  private refreshDudas(){
    this.dudasSubject.next(this.dudas);
  }

  cargarComentarios(){
    let comentarios : Comentario[];
    let dudas = new Array<Comentario>();
    let experiencias = new Array<Comentario>();
    this.httpClient.get(this.URL_API).subscribe(res =>{
      comentarios = res as Comentario[];
      for(let comentario of comentarios){
        if(comentario.tipo === "Dudas"){
          dudas.push(comentario);
        }
        else{
          experiencias.push(comentario);
        }
      }
      this.setDudas(dudas);
      this.setExperiencias(experiencias);
    });
  }

  getComentarios(){
    return this.httpClient.get(this.URL_API);
  }

  postComentario(Comentario : Comentario){
    return this.httpClient.post(this.URL_API, Comentario, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  putComentario(Comentario : Comentario){
    return this.httpClient.put(this.URL_API + `/${Comentario._id}`, Comentario,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  deleteComentario(_id : String){
    return this.httpClient.delete(this.URL_API + `/${_id}`,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }
}
