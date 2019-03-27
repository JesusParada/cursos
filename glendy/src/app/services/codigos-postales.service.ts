import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodigosPostalesService {
  URL_API = 'https://api-codigos-postales.herokuapp.com/v2/';

  constructor(public httpClient : HttpClient) { }

  public getInfoDireccion(codigo : string):Observable<any>{
    return this.httpClient.get(this.URL_API+"codigo_postal/"+codigo);
  }

}
