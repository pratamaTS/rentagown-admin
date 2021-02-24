import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../_services/product.service'
import { ApiHelper } from '../_services/api-helper'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataWishlist: any = []
  errorMessage = ''
  Realdata: any = []

  constructor(private tokenStorage: TokenStorageService,
    private helper: ApiHelper,
    private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
    let body = {
      "from": "01-02-1900",
      "to": "28-02-2050"
    }
    if (this.token != null) {
      this.helper.POST("api/wishlist/find/between", body, this.tokenType, this.token)
        .subscribe(
          data => {
            this.dataWishlist = data.data
            this.Realdata = data.data
            //     console.log('data wishlist', this.dataWishlist)
          },
          err => {
            this.errorMessage = err.error.error;
          }
        );
      // this.productService.getAllWishlist(this.tokenType, this.token).subscribe(
      //   data => {
      //     this.dataWishlist = data.data
      //     this.Realdata = data.data
      //     console.log('data wishlist', this.dataWishlist)
      //   },
      //   err => {
      //     this.errorMessage = err.error.message;
      //   }
      // )
    } else {
      console.log('error', 'Please login first!')
    }
  }
  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataWishlist = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.product_name.includes(f))
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
