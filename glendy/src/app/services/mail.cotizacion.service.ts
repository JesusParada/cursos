import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from './authenticate.service';
import { Compra } from '../models/compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailCotizacionService {
  readonly URL_API = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient, private auth: AuthenticateService) {
    
   }

  cotizar(compra: Compra):Observable<any>{
    return this.httpClient.post(this.URL_API+"cotizar/" , compra , { headers:{ Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  enviarEmail(datos){
    return this.httpClient.post(this.URL_API+"email/" , datos , { headers:{ Authorization: `Bearer ${this.auth.getToken()}` }});
  }
}
