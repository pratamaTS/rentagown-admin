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
    id_transaction: "",
    last_payment_invoice: "",
    id_product: "",
    product_name: "",
    product_category: "",
    product_final_price: 0,
    product_path_photo: "",
    product_promo_amount: 0,
    product_promo_amount_percent: 0,
    id_user: "",
    name: "",
    receiver_name: "",
    receiver_phone: "",
    id_address: "",
    address_label: "",
    address: "",
    address_detail: "",
    notes_address: "",
    notes_booking: "",
    phone: "",
    one_day_service: 0,
    down_payment: 0,
    full_payment: 0,
    start_date: "",
    end_date: "",
    id_dest_bank: "",
    bank_dest_name: "",
    account_dest_number: "",
    account_dest_name: "",
    bank_dest_path_photo: "",
    remaining_bills: 0,
    status: 0,
    status_name: "",
    payment_type: 0,
    payment_type_name: "",
    last_payment_status: 0,
    last_payment_status_name: "",
    last_payment_deadline: "",
    last_payment_bank_name: "",
    last_payment_account_number: "",
    last_payment_account_name: "",
    last_payment_amount: 0,
    last_payment_invoice_amount: 0,
    last_payment_date_time: "",
    last_payment_method: 1,
    last_payment_method_name: "",
    able_fitting: 0,
    able_pay: 0,
    able_rate: 0,
    next_payment_amount: 0,
    id_fitting: "",
    id_rating: "",
    fcm_id: "",
    created_at: "",
    updated_at: ""
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
        if(this.salesOrder.product_path_photo != ""){
            this.imageSrc = "http://absdigital.id:55000" + this.salesOrder.product_path_photo
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
    let doc = new jsPDF('l','pt', 'a2');

    doc.html(DATA, {
      callback: (doc) => {
        doc.save('sales-invoice-receipt.pdf');
      }
    });
  }

}
