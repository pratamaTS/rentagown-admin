import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHelper {

  constructor(private http: HttpClient) { }

  GET(url: string, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get(url, httpOptions);
  }

  POST(url: string, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post(url, data, httpOptions);
  }

  PUT(url: string, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.put(url, data, httpOptions);
  }

  ApiDate(d: any): string {
    let MyDate = new Date(d)
    let MyDateString = ('0' + MyDate.getDate()).slice(-2) + '-'
      + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
      + MyDate.getFullYear();
    return MyDateString
  }

  // DELETE(url: string, data: any, tokenType: String, token: String | null): Observable<any> {
  //   const authorization = tokenType + ' ' + token
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': authorization,
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     })
  //   };
  //   return this.http.delete(url, data, httpOptions);
  // }
}
