import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) { }

  getAllBankAccount(tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get('api/bank/findall', httpOptions);
  }

  getBankAccountByID(id: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get(`api/bank/findid/${id}`, httpOptions);
  }

  create(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post('api/bank', data, httpOptions);
  }

  uploadPhotoLogoBank(id_bank:any, logo_photo: File, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    var fd = new FormData();
        fd.append('photo_detail', logo_photo);
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post(`api/bank/photo/${id_bank}`, fd, httpOptions);
  }

  update(id: any, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put(`api/bank/${id}`, data, httpOptions);
  }

  delete(id: any, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      body: data
    };

    return this.http.delete(`api/bank/${id}`, httpOptions);
  }
}
