import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export interface DetallesUsuario{
  sub: string, //user._id,
  name: string , //user.nombre_usuario,
  tipo: string, // user.tipo,
  iat: number, // moment().unix(),
  exp: number// moment().add(14,'days').unix()
}

interface TokenResponse {
  token?: string;
  mensaje: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private token: string;
  readonly URL_API = 'http://localhost:3000/api/usuarios/';

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): DetallesUsuario {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean{
    return this.isLoggedIn() && this.getUserDetails().tipo === 'Admin';
  }

  private request(method: 'post'|'get', type: 'login'|'register', user?: Usuario): Observable<any> {
    let base;
    if (method === 'post') {
      base = this.http.post(`${this.URL_API}${type}`, user);
    } else {
      base = this.http.get(`${this.URL_API}${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: Usuario): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: Usuario): Observable<any> {
    return this.request('post', 'login', user);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
