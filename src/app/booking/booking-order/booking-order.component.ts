import { Component, OnInit, ViewChild } from '@angular/core'
import { TokenStorageService } from '../../_services/token-storage.service'
import { BookingOrderService } from '../../_services/booking-order.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '../../_services/api-helper'

@Component({
  selector: 'app-booking-order',
  templateUrl: './booking-order.component.html',
  styleUrls: ['./booking-order.component.css']
})
export class BookingOrderComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  id: any = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataBookingOrder: any = []
  errorMessage = ''
  currentIndex = -1
  pageS: number = 1
  count: number = 0
  pageSize: number = 5
  pageSizes = [5, 10, 20]
  Realdata: any = []
  viewMode: boolean = false;
  BookingSingle: any = {}

  constructor(private tokenStorage: TokenStorageService,
    private helper: ApiHelper,
    private bookingOrderService: BookingOrderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const params = this.getRequestParams(this.pageS, this.pageSize);

    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.bookingOrderService.getAllBO(this.tokenType, this.token, params).subscribe(
        data => {
          this.dataBookingOrder = data.data
          this.count = data.total
          this.Realdata = data.data
          this.dtTrigger.next();
          console.log("booking", this.dataBookingOrder)
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

  retrieveBooking(): void {
    const params = this.getRequestParams(this.pageS, this.pageSize);

    this.bookingOrderService.getAllBO(this.tokenType, this.token, params).subscribe(
      data => {
        this.dataBookingOrder = data.data
        this.count = data.total
        if (this.dataBookingOrder.page) {
          params[`page`] = this.pageS - 1;
        }

        if (this.dataBookingOrder.pageSize) {
          params[`size`] = this.pageSize;
        }

        this.Realdata = data.data
        this.dtTrigger.next();
        console.log("booking", this.dataBookingOrder)
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

  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataBookingOrder = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.name.includes(f) || d.product_name.includes(f) || d.invoice.includes(f))
    })
  }

  rejectPayment(booking: any) {
    console.log("id book", booking.id)
    const data = {
      id_transaction: booking.id,
    };

    this.bookingOrderService.rejectPayment(data, this.tokenType, this.token)
      .subscribe(
        data => {
          this.id = data.data.id_transaction
          this.refreshData()
        },
        error => {
          console.log(error);
        });
  }

  confirmPayment(booking: any) {
    console.log("id book", booking.id_transaction)
    const data = {
      id_transaction: booking.id_transaction,
      invoice: booking.last_payment_invoice
    };

    this.bookingOrderService.confirmPayment(data, this.tokenType, this.token)
      .subscribe(
        data => {
          this.id = data.data.id_transaction
          this.refreshData()
        },
        error => {
          console.log(error);
        });
  }

  finishBooking(booking: any) {
    console.log("id book", booking.id_transaction)
    const data = {
      id_transaction: booking.id_transaction
    };

    this.bookingOrderService.finishBooking(data, this.tokenType, this.token)
      .subscribe(
        data => {
          this.id = data.data.id_transaction
          this.refreshData()
        },
        error => {
          console.log(error);
        });
  }

  viewData(a: any) {
    this.viewMode = true
    this.BookingSingle = a
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

  refreshData(): void {
    if (this.token != null) {
      const params = this.getRequestParams(this.pageS, this.pageSize);
      this.bookingOrderService.getAllBO(this.tokenType, this.token, params).subscribe(
        data => {
          this.dataBookingOrder = data.data
          this.count = data.total
          console.log('data booking', this.dataBookingOrder)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }

}
