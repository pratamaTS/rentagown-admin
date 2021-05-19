import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { LocalStorageService } from '../_services/local-storage.service';
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
  oldCountBookingOrder: any = 0
  oldCountSO: any = 0
  countSalesOrder: any = 0
  notifCountBook: any = 0
  notifCountSO: any = 0
  paymentStatusBooking: any = 0
  paymentStatusSO: any = 0
  count: any = 0
  pageS: number = 1
  pageSize: number = 5
  pageSizes = [5, 10, 20]
  read = false

  constructor(private localStorage: LocalStorageService, private tokenStorage: TokenStorageService, private profileService: ProfileService, private bookingOrderService: BookingOrderService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken()
    this.oldCountBookingOrder = this.localStorage.getCountNotifBooking() | 0
    this.oldCountSO = this.localStorage.getCountNotifSO() | 0
    this.count = this.localStorage.getTotalCOunt() | 0
    this.read = this.localStorage.getStatusRead()
    this.countBookingOrder = this.localStorage.getCountNotifBooking() | 0
    this.countSalesOrder = this.localStorage.getCountNotifSO() | 0
    console.log('read notif get', this.read)

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
    this.bookingOrderService.getAllBookingOrder(this.tokenType, this.token).subscribe(
      data => {
        this.dataBookingOrder = data.data
        this.countBookingOrder = this.dataBookingOrder.length | 0

        for(let booking of this.dataBookingOrder){
          if(booking.last_payment_status == 2){
            this.paymentStatusBooking = 2
            break
          }
        }

        if(this.paymentStatusBooking == 2 && this.read == false){
          this.countBookingOrder = this.countBookingOrder + 1
        }

        console.log('payment status', this.dataBookingOrder.last_payment_status)
        console.log('count booking', this.countBookingOrder)
        console.log('old count booking', this.oldCountBookingOrder)

        if(this.countBookingOrder > this.oldCountBookingOrder && this.countBookingOrder != 0){
          if(this.paymentStatusBooking == 2 && this.read == false){
            this.countBookingOrder = this.countBookingOrder - 1
          }
          this.localStorage.saveCountNotifBooking(this.countBookingOrder)
          this.notifCountBook = 1
          this.totalCount(this.notifCountBook, this.notifCountSO)
          this.read = false
        }
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  getSalesOrderCount(): void {
    const params = this.getRequestParams(this.pageS, this.pageSize);

    this.bookingOrderService.getAllSalesOrder(this.tokenType, this.token, params).subscribe(
      data => {
        this.dataSalesOrder = data.data
        this.countSalesOrder = this.dataSalesOrder.length | 0

        for(let so of this.dataSalesOrder){
          if(so.last_payment_status == 2){
            this.paymentStatusSO = 2
            break
          }
        }

        if(this.paymentStatusSO == 2 && this.read == false){
          this.countSalesOrder = this.countSalesOrder + 1
        }

        console.log('count so', this.countSalesOrder)
        console.log('old count so', this.oldCountSO)

        if(this.countSalesOrder > this.oldCountSO && this.countSalesOrder != 0){
          if(this.paymentStatusSO == 2 && this.read == false){
            this.countSalesOrder = this.countSalesOrder - 1
          }
          this.localStorage.saveCountNotifSalesOrder(this.countSalesOrder)
          this.notifCountSO = 1
          this.totalCount(this.notifCountBook, this.notifCountSO)
          this.read = false
        }
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  getRequestParams(pageS: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (pageS) {
      params[`page`] = pageS;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  totalCount(countBook: any, countSO: any): void {
    this.count = countBook + countSO
    this.localStorage.saveTotalCount(this.count)
  }

  readNotif(): void {

    setTimeout(() => {
    this.read = true
    this.count = 0
    this.localStorage.saveTotalCount(this.count)
    this.localStorage.saveStatusRead(this.read)
    console.log('read notif', this.read)
    }, 2000);
  }

  readNotifBooking(): void {
      this.read = true
      this.localStorage.saveStatusRead(this.read)
      console.log('read notif booking', this.read)
      this.router.navigateByUrl('booking-order')
  }

  readNotifSO(): void {
    this.read = true
    this.localStorage.saveStatusRead(this.read)
    console.log('read notif so', this.read)
    this.router.navigateByUrl('sales-order')
  }

  logout(): void {
    let myconfirm = confirm("Are You Sure want to log out?");
    if (!myconfirm) return
    this.tokenStorage.signOut()
    this.router.navigateByUrl('login')
  }

}
