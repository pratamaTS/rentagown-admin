import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../_services/product.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataProduct: any = []
  errorMessage = ''
  Realdata: any = []

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.productService.getAllProduct(this.tokenType, this.token).subscribe(
        data => {
          this.dataProduct = data.data
          this.Realdata = data.data
          console.log('data product', this.dataProduct)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }
  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataProduct = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.id_product.includes(f) ||d.product_name.includes(f) || d.name_product_category.includes(f))
    })
  }
  refreshData(): void {
    this.productService.getAllProduct(this.tokenType, this.token).subscribe(
      data => {
        this.dataProduct = data.data
        console.log('data product', this.dataProduct)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  onDeleteProduct(id: any): void {
    const data = {
      id_photo: id
    };
    this.productService.deleteProductDetails(id, data, this.tokenType, this.token)
      .subscribe(
        response => {
          this.onDeleteProductDetail(id)
        },
        error => {
          console.log("Delete product Error >>>>",error);
        });
  }

  onDeleteProductDetail(id: any): void {
    const data = {
      id_product: id
    };
    this.productService.deleteProduct(id, data, this.tokenType, this.token)
      .subscribe(
        response => {
          alert("Success, Product Deleted")
          this.refreshData()
        },
        error => {
          alert("Error Delete")
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

}
