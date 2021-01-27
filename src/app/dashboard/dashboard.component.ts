import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from 'src/app/_services/product.service';
import { BookingOrderService } from '../_services/booking-order.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: String = ''
  email: String = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataPromo: any= []
  dataProduct: any= []
  dataSalesOrder: any= []
  countPromo: any = 0
  countProduct: any = 0
  countSalesOrder: any = 0
  errorMessage: string = ''

  constructor(private tokenStorage: TokenStorageService, private bookingOrderService: BookingOrderService, private productService: ProductService) { }

  ngOnInit(): void {
    
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.getSalesOrderCount()
      this.getProductCount()
      this.getPromoCount()
    }else{
      console.log('error', 'Please login first!')
    }
  }

  getSalesOrderCount(): void {
    this.bookingOrderService.getAllSalesOrder(this.tokenType, this.token).subscribe(
      data => {
        this.dataSalesOrder = data.data
        this.countSalesOrder = this.dataSalesOrder.length
        console.log('count sales', this.countSalesOrder)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  getProductCount(): void {
    this.productService.getAllProduct(this.tokenType, this.token).subscribe(
      data => {
        this.dataProduct = data.data
        this.countProduct = this.dataProduct.length
        console.log('count product', this.countProduct)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  getPromoCount(): void {
    this.productService.getAllPromo(this.tokenType, this.token).subscribe(
      data => {
        this.dataPromo = data.data
        this.countPromo = this.dataPromo.length
        console.log('count promo', this.countPromo)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }
}
