import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../_services/product.service'
import { ProductCategory } from '../_models/product-category.model'
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  id: any = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataProductCategory: any = []
  errorMessage = ''

  productCategory: ProductCategory = {
    name_product_category: ''
  }

  submitted = false;
  updated = false
  message = '';

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.productService.getAllProductCategory(this.tokenType, this.token).subscribe(
        data => {
          this.dataProductCategory = data.data
          console.log('data product category', this.dataProductCategory)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }

  refreshData(): void {
    this.productService.getAllProductCategory(this.tokenType, this.token).subscribe(
      data => {
        this.dataProductCategory = data.data
        console.log('data product category', this.dataProductCategory)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  onCreateProductCategory(): void {

    if (this.token != null) {
      if(this.productCategory.name_product_category == null || this.productCategory.name_product_category == ""){
        this.errorMessage = "Category name is required"
      }else{
        const data = {
          name_product_category: this.productCategory.name_product_category
        };

        this.productService.createProductCategory(data, this.tokenType, this.token)
          .subscribe(
            response => {
              this.productCategory.name_product_category = ""
              this.errorMessage = '';
              this.submitted = true;
              this.refreshData()
            },
            error => {
              this.errorMessage = error.error.error;
            });
      }
    } else {
      console.log('error', 'Please login first!')
    }
  }

  onDeleteProductcategory(id: any): void {
    let myconfirm = confirm("Delete this data, Are You Sure?");
    if (!myconfirm) return
    const data = {
      id_product_category: id
    };
    this.productService.deleteProductCategory(id, data, this.tokenType, this.token)
      .subscribe(
        response => {
          this.productCategory.name_product_category = ""
          console.log(response);
          this.refreshData()
        },
        error => {
          console.log(error);
        });
  }

  onUpdateProductCategory(id: any): void {
    if (this.updated == false) {

    } else {
      this.productService.updateProductCategory(this.id, this.productCategory, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message;
            this.refreshData()
          },
          error => {
            console.log(error);
          });
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
