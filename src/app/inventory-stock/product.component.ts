import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../_services/product.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class InventoryStock implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataProduct: any = []
  errorMessage = ''
  myDate: any = ''
  Realdata: any = []

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.getProductStock("");
    } else {
      console.log('error', 'Please login first!')
    }
  }

  refreshData(): void {
    this.getProductStock("");
  }
  onChangeDate(): void {
    this.getProductStock(this.myDate)
  }
  toGolangDate(d: any): any {
    let today: any = new Date()
    if (d && d != "") {
      today = new Date(d)
    }
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    console.log(today)
    return today
  }
  getProductStock(d: any): void {
    const authorization = this.tokenType + ' ' + this.token

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };


    this.http.get('api/booking/checkinvstock?date=' + this.toGolangDate(d), httpOptions).subscribe(
      (data: any) => {
        this.dataProduct = data.data.data
        this.Realdata = data.data.data
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }
  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataProduct = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.id_product.includes(f) || d.product_name.includes(f))
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
