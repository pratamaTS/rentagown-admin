import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { BookingOrderService } from '../_services/booking-order.service'

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent implements OnInit {

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataSalesOrder: any = []
  errorMessage = ''

  constructor(private tokenStorage: TokenStorageService, private bookingOrderService: BookingOrderService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.bookingOrderService.getAllSalesOrder(this.tokenType, this.token).subscribe(
        data => {
          this.dataSalesOrder = data.data
          console.log('data sales order', this.dataSalesOrder)
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
