import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  readonly URL_API = 'http://localhost:3000/api/imagenes';
  
  constructor( private http:HttpClient) {
  }
  
  subirImagen(datos:any):Observable<any>{
    return this.http.post(this.URL_API, datos);
  }
}
