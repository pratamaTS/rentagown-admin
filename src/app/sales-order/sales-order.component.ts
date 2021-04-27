import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { BookingOrderService } from '../_services/booking-order.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiHelper } from '../_services/api-helper'


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
  currentIndex = -1
  pageS: number = 1
  count: number = 0
  pageSize: number = 5
  pageSizes = [5, 10, 20]
  Realdata: any = []
  viewMode: boolean = false;
  BookingSingle: any = {}

  constructor(private tokenStorage: TokenStorageService, private helper: ApiHelper, private bookingOrderService: BookingOrderService) { }

  ngOnInit(): void {
    const params = this.getRequestParams(this.pageS, this.pageSize);

    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.bookingOrderService.getAllSalesOrder(this.tokenType, this.token, params).subscribe(
        data => {
          this.dataSalesOrder = data.data
          console.log('sales order oninit', data)
          this.count = data.total
          this.Realdata = data.data
          this.dtTrigger.next();
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
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

  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataSalesOrder = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.product_name.includes(f) || d.last_payment_invoice.includes(f))
    })
  }

  retrieveBooking(): void {
    const params = this.getRequestParams(this.pageS, this.pageSize);

    this.bookingOrderService.getAllSalesOrder(this.tokenType, this.token, params).subscribe(
      data => {
        this.dataSalesOrder = data.data
        this.count = data.total
        console.log('sales order retreive', data)
        if (this.dataSalesOrder.page) {
          params[`page`] = this.pageS - 1;
        }

        if (this.dataSalesOrder.pageSize) {
          params[`size`] = this.pageSize;
        }

        this.Realdata = data.data
        this.dtTrigger.next();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  handlePageChange(event: number): void {
    this.pageS = event;
    this.retrieveBooking();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.pageS = 1;
    this.retrieveBooking();
  }

  viewData(a: any) {
    this.viewMode = true
    this.BookingSingle = a
    console.log("created at", this.BookingSingle.created_at)
    this.helper.GET("api/fitting/" + a.id_fitting, "", "")
      .subscribe(
        data => {
          let f = data.data
          this.BookingSingle.bust = f.bust
          this.BookingSingle.arm_hole = f.arm_hole
          this.BookingSingle.waist = f.waist
          this.BookingSingle.hip = f.hip
        },
        err => {
          this.errorMessage = err.error.error;
        }
      );
  }

  DisplayDate(d: any) {
    return this.helper.ApiDate(d)
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
