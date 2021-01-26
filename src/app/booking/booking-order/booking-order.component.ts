import { Component, OnInit } from '@angular/core'
import { TokenStorageService } from '../../_services/token-storage.service'
import { BookingOrderService } from '../../_services/booking-order.service'

@Component({
  selector: 'app-booking-order',
  templateUrl: './booking-order.component.html',
  styleUrls: ['./booking-order.component.css']
})
export class BookingOrderComponent implements OnInit {

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataBookingOrder: any = []
  errorMessage = ''

  constructor(private tokenStorage: TokenStorageService, private bookingOrderService: BookingOrderService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.bookingOrderService.getAllBookingOrder(this.tokenType, this.token).subscribe(
        data => {
          this.dataBookingOrder = data.data
          console.log('data product', this.dataBookingOrder)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }

}
