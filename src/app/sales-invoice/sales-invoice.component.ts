import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { BookingOrderService } from '../_services/booking-order.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataSalesInvoice: any = []
  errorMessage = ''

  constructor(private tokenStorage: TokenStorageService, private bookingOrderService: BookingOrderService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.bookingOrderService.getAllSalesInvoice(this.tokenType, this.token).subscribe(
        data => {
          this.dataSalesInvoice = data.data
          this.dtTrigger.next();
          console.log('data sales invoice', this.dataSalesInvoice)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
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
