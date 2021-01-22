import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get('api/product/findall', httpOptions);
  }

  getAllProductCategory(tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get('api/prodcat/findall', httpOptions);
  }

  getAllWishlist(tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get('api/wishlist/findid', httpOptions);
  }

  getAllPromo(tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get('api/promo/findall', httpOptions);
  }

  createProductCategory(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post('api/prodcat', data, httpOptions);
  }

  updateProductCategory(id: any, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put(`api/prodcat/${id}`, data, httpOptions);
  }

  deleteProductCategory(id: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.delete(`api/prodcat/${id}`, httpOptions);
  }
}
