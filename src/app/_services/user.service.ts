import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get('api/user/findall', httpOptions);
  }

  uploadPhotoProfile(data: FormData, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put(`api/user/avatar`, data, httpOptions);
  }

  updateUserProfile(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put(`api/user/update`, data, httpOptions);
  }

  updateUserPass(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put(`api/user/pass`, data, httpOptions);
  }

  deleteUser(data:any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      body: data
    };

    return this.http.delete(`api/user/account`, httpOptions);
  }
}
