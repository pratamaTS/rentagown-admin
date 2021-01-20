import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://absdigital.id:5000/api/v/1/';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Content-Length': '<calculated when request is sent>',
    'Host': 'absdigital.id',
    'Accept-Encoding': 'gzip, deflate, br',
    'Access-Control-Allow-Origin': '*'
 })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'user/login', {
      email,
      password
    }, httpOptions);
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
