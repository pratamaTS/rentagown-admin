import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { BookingOrderService } from '../../_services/booking-order.service'
import { SalesOrder } from '../../_models/sales-order.model'
import { ActivatedRoute, Router } from '@angular/router'
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-sales-invoice-detail',
  templateUrl: './sales-invoice-detail.component.html',
  styleUrls: ['./sales-invoice-detail.component.css']
})
export class SalesInvoiceDetailComponent implements OnInit {

  @ViewChild("salesInvoiceReceipt")
  salesInvoiceReceipt!: ElementRef;
  id: any = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataSalesOrderDetail: any = []
  errorMessage = ''
  imageSrc: string = ''

  salesOrder: SalesOrder = {
    id_transaction: '',
    invoice: '',
    paid_price: '',
    id_product: '',
    product_name: '',
    path_photo: '',
    id_user: '',
    name: '',
    address: '',
    address_detail: '',
    phone: '',
    start_date: '',
    end_date: '',
    one_day_service: '',
    down_payment: '',
    forfeit: '',
    payment_method: '',
    status_transaction: '',
    status: '',
    remaining_bills: '',
    payment_bank_name: '',
    payment_account_number: '',
    payment_account_name: '',
    payment_amount: '',
    repayment_bank_name: '',
    repayment_account_number: '',
    repayment_account_name: '',
    repayment_amount: '',
    total_bill_amount: '',
    bookingdetails: [],
    created_at: '' ,
    updated_at: ''
  }
  message = '';

  constructor(private tokenStorage: TokenStorageService, private bookingOrderService: BookingOrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
    console.log('token detail', this.token)
    this.id = this.route.snapshot.params.id
    if(this.token != null){
      this.getSalesInvoiceByID(this.id)
    }else{
      this.message = 'Please login first!'
    }
  }

  getSalesInvoiceByID(id: string): void {
    this.bookingOrderService.getSalesOrderByID(id, this.tokenType, this.token).subscribe(
      data => {
        this.salesOrder = data.data
        if(this.salesOrder.path_photo != ""){
            this.imageSrc = "http://absdigital.id:5000" + this.salesOrder.path_photo
        }
        console.log('data bank', this.salesOrder)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  public downloadPDF():void {
    let DATA = this.salesInvoiceReceipt.nativeElement;
    let doc = new jsPDF('l','pt', 'a3');

    doc.html(DATA, {
      callback: (doc) => {
        doc.save('sales-invoice-receipt.pdf');
      }
    });
  }

}
