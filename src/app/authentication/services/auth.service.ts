import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtDecodeService } from './jwt-decode.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtDecodeService: JwtDecodeService
  ) { }

  //Verifica si existe algun token
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  //Envia la cuenta del usuario para el inicio de sesion
  login(username: string, password: string) {
    var user = new User();

    //@ts-ignore
    user.id = 0;
    user.username = username;
    user.password = password;
    user.firstName = username;
    user.lastName = username;
    user.confirmPassword = password;

    const reqHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    //Guarda en el LocalStorage los datos del Usuario
    return this.http.post<any>(environment.BACK_END_HOST + 'users/authenticate', user, reqHeader)
      .pipe(
        map(user => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
          localStorage.setItem('email', user.email);
          localStorage.setItem('roles', this.jwtDecodeService.decodeToken(user.token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
          localStorage.setItem('userid', this.jwtDecodeService.decodeToken(user.token)['user_id']);
          localStorage.setItem('expires', this.jwtDecodeService.decodeToken(user.token)['exp']);

          return true;
        })
      );
  }

  //Obtiene el token
  getToken() {
    return localStorage.getItem('token');
  }

  //Obtiene el nombre del Usuario
  getUsername() {
    return localStorage.getItem('username');
  }

  //Obtiene el id del Usuario
  getUserId() {
    return localStorage.getItem('userid');
  }

  //Obtiene el codigo de Semestre
  getSemester() {
    return localStorage.getItem('semesterCode');
  }

  //Obtiene todos los roles 
  getRoles() {
    var roles = localStorage.getItem('roles');
    if (roles) {
      return roles.split(',');
    }
    else {
      return [];
    }
  }

  //Verifica si el token ya expiro
  tokenHasExpired() {
    var convertDate = parseInt(localStorage.getItem('expires')) * 1000;
    var expireDate = new Date(convertDate);
    var currentDate = new Date();

    return currentDate > expireDate;
  }

  //Cierra sesion y elimina los datos del Local Storage
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('userid');
    localStorage.removeItem('expires');
    this.router.navigate(['/login']);
  }
}
