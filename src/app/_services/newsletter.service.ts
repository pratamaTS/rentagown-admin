import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }

  uploadPhotoNewsletter(data: FormData, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post(`api/newsletter/photo`, data, httpOptions);
  }

  createNewsletterAllUser(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post('api/newsletter/alluser', data, httpOptions);
  }
}
