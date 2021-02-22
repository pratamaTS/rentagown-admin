import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../_services/product.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataPromo: any = []
  errorMessage = ''
  Realdata: any = []

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.productService.getAllPromo(this.tokenType, this.token).subscribe(
        data => {
          this.dataPromo = data.data
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
    this.dataPromo = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.promo_name.includes(f) || d.promo_code.includes(f))
    })
  }
  refreshData(): void {
    if (this.token != null) {
      this.productService.getAllPromo(this.tokenType, this.token).subscribe(
        data => {
          this.dataPromo = data.data
          console.log('data promo', this.dataPromo)
        },
        err => {
          this.errorMessage = err.error.error;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }

  onDelete(id: any): void {
    const data = {
      id_bank: id
    };
    this.productService.deletePromo(id, data, this.tokenType, this.token)
      .subscribe(
        response => {
          console.log(response);
          this.refreshData()
        },
        err => {
          this.errorMessage = err.error.error;
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
}
