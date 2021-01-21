import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://absdigital.id:5000/api/v/1/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get('/api/user/profile', httpOptions)
  }
}
