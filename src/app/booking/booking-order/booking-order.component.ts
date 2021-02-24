import { Component, OnInit, ViewChild } from '@angular/core'
import { TokenStorageService } from '../../_services/token-storage.service'
import { BookingOrderService } from '../../_services/booking-order.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  Realdata: any = []
  viewMode: boolean = false;
  BookingSingle: any = {}

  constructor(private tokenStorage: TokenStorageService, private bookingOrderService: BookingOrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.bookingOrderService.getAllBookingOrder(this.tokenType, this.token).subscribe(
        data => {
          this.dataBookingOrder = data.data
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
  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataBookingOrder = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.name.includes(f) || d.product_name.includes(f) || d.invoice.includes(f))
    })
  }
  processBooking(id: any) {
    console.log("id book", id)
    const data = {
      id_transaction: id,
      status: 2
    };

    this.bookingOrderService.updateBooking(id, data, this.tokenType, this.token)
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
    console.log(a)
    this.BookingSingle = a
  }
  doneBooking(id: any) {
    console.log("id book", id)
    const data = {
      id_transaction: id,
      status: 3
    };

    this.bookingOrderService.updateBooking(id, data, this.tokenType, this.token)
      .subscribe(
        data => {
          this.id = data.data.id_transaction
          this.refreshData()
        },
        error => {
          console.log(error);
        });
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
      this.bookingOrderService.getAllBookingOrder(this.tokenType, this.token).subscribe(
        data => {
          this.dataBookingOrder = data.data
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
