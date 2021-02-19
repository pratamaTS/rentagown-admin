import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { BookingOrderService } from '../_services/booking-order.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataSalesOrder: any = []
  errorMessage = ''
  Realdata: any = []
  constructor(private tokenStorage: TokenStorageService, private bookingOrderService: BookingOrderService) { }

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.bookingOrderService.getAllSalesOrder(this.tokenType, this.token).subscribe(
        data => {
          this.dataSalesOrder = data.data
          this.Realdata = data.data
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }

  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataSalesOrder = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.product_name.includes(f) || d.invoice.includes(f))
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
