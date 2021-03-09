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
  count: any = 0
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

    console.log('')

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

        console.log('count booking', this.countBookingOrder)
        console.log('old count booking', this.oldCountBookingOrder)

        if(this.countBookingOrder > this.oldCountBookingOrder){
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
    this.bookingOrderService.getAllSalesOrder(this.tokenType, this.token).subscribe(
      data => {
        this.dataSalesOrder = data.data
        this.countSalesOrder = this.dataSalesOrder.length | 0

        console.log('count so', this.countSalesOrder)
        console.log('old count so', this.oldCountSO)

        if(this.countSalesOrder > this.oldCountSO){
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
    }, 5000);
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
    this.tokenStorage.signOut()
    this.router.navigateByUrl('login')
  }

}
