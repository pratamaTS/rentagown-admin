import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_API = 'http://absdigital.id:5000/api/v/1/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
 }),
};

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    var token: any = localStorage.getItem('access_token');
    console.log('token from auten', localStorage['access_token'])
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(email: string, password: string): Observable<any> {
    const body = {email, password}
    return this.http.post('api/user/login', body, httpOptions);
  }

  register(name: string, email: string, password: string, platform: string): Observable<any> {
    return this.http.post(AUTH_API + 'user', {
      name,
      email,
      password,
      platform
    }, httpOptions);
  }
}
