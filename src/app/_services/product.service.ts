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

    // return this.http.get('api/wishlist/findall', httpOptions);
    return this.http.get('api/wishlist/findall/1/20', httpOptions);
  }

  postAllWishlist(tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    const body = {
       "from":"01-02-2021",
       "to":"20-02-2021"
    }

    return this.http.post('api/wishlist/find/between',body, httpOptions);
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

  getProductByID(id: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get(`api/product/findid/${id}`, httpOptions);
  }

  getPromoByID(id: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get(`api/promo/findid/${id}`, httpOptions);
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

  deleteProductCategory(id: any, data:any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      body: data
    };

    return this.http.delete(`api/prodcat/${id}`, httpOptions);
  }

  createProduct(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post('api/product', data, httpOptions);
  }

  createProductDetails(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post('api/productdetail', data, httpOptions);
  }

  createPromoDetails(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post('api/promodetail', data, httpOptions);
  }

  uploadPhotoProduct(id_product:any, data: FormData, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post(`api/productdetail/photo/${id_product}`, data, httpOptions);
  }

  uploadPhotoPromo(id_promo:any, data: FormData, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post(`api/promo/photo/${id_promo}`, data, httpOptions);
  }

  updateProduct(id: any, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put(`api/product/${id}`, data, httpOptions);
  }

  updateProductDetails(id: any, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put(`api/productdetail/${id}`, data, httpOptions);
  }

  deleteProduct(id: any, data:any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      body: data
    };

    return this.http.delete(`api/product/${id}`, httpOptions);
  }

  deleteProductDetails(id: any, data:any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      body: data
    };

    return this.http.delete(`api/productdetail/${id}`, httpOptions);
  }

  createPromo(data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post('api/promo', data, httpOptions);
  }

  updatePromo(id: any, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put(`api/promo/update/${id}`, data, httpOptions);
  }

  deletePromo(id: any, data: any, tokenType: String, token: String | null): Observable<any> {
    const authorization = tokenType + ' ' + token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.delete(`api/promo/${id}`, httpOptions);
  }
}
