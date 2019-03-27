import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  readonly URL_API = 'http://localhost:3000/api/estados/';

  constructor(private httpClient: HttpClient) {
   }

   getEstados(pais : String): Observable<any>{
    return this.httpClient.get(this.URL_API+pais);
  }

}
