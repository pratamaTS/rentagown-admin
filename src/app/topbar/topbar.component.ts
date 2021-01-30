import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProfileService } from '../_services/profile.service';
import { ProductService } from 'src/app/_services/product.service';
import { BookingOrderService } from '../_services/booking-order.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  name: String = ''
  email: String = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  user: any;
  profile: any
  errorMessage = ''
  dataPromo: any= []
  dataProduct: any= []
  dataBookingOrder: any= []
  dataSalesOrder: any= []
  countPromo: any = 0
  countProduct: any = 0
  countBookingOrder: any = 0
  countSalesOrder: any = 0
  count: any = 0
  read = false

  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService, private bookingOrderService: BookingOrderService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken()
      if(this.token != null){
        this.getProfile()
        this.getBookingOrderCount()
        this.getSalesOrderCount()
      }else{
        console.log('error', 'Please login first!')
      }
  }

  getProfile(): void {
    this.profileService.getProfile(this.tokenType, this.token).subscribe(
      data => {
        this.user = data.data
        this.name = this.user.name
        console.log('user', this.user)
        this.tokenStorage.saveUser(this.user.role)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  getBookingOrderCount(): void {
    if(this.read == false) {
      this.bookingOrderService.getAllBookingOrder(this.tokenType, this.token).subscribe(
        data => {
          this.dataBookingOrder = data.data
          if(data.data != null){
            this.countBookingOrder = this.dataBookingOrder.length | 0
            this.count = this.countBookingOrder
            console.log('count sales', this.countBookingOrder)
          }
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else {
      this.countBookingOrder = this.countBookingOrder
    }
  }

  getSalesOrderCount(): void {
    if(this.read == false) {
      this.bookingOrderService.getAllSalesOrder(this.tokenType, this.token).subscribe(
        data => {
          this.dataSalesOrder = data.data
          if(data.data != null){
            this.countSalesOrder = this.dataSalesOrder.length | 0
            this.count = this.countBookingOrder
            console.log('count sales', this.countSalesOrder)
          }
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else {
      this.countSalesOrder = this.countSalesOrder
    }
  }

  readNotif(): void {
    if(this.countSalesOrder > 0){
      this.countSalesOrder - this.countSalesOrder - 1
      this.read = true
      this.router.navigateByUrl('sales-order')
    }else {
      this.countSalesOrder = 0
    }
  }

  logout(): void {
    this.tokenStorage.signOut()
    this.router.navigateByUrl('login')
  }

}
