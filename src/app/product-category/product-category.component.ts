import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../_services/product.service'
import { ProductCategory } from '../_models/product-category.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  id: any = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataProductCategory: any = []
  errorMessage = ''

  productCategory: ProductCategory = {
    name_product_category: ''
  }

  submitted = false;
  message = '';

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.productService.getAllProductCategory(this.tokenType, this.token).subscribe(
        data => {
          this.dataProductCategory = data.data
          console.log('data product category', this.dataProductCategory)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
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

    if(this.token != null){
      const data = {
        name_product_category: this.productCategory.name_product_category
      };

      this.productService.createProductCategory(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.refreshData()
          },
          error => {
            console.log(error);
      });
    }else{
      console.log('error', 'Please login first!')
    }
  }

  onDeleteProductcategory(id: any): void {
    this.productService.deleteProductCategory(id, this.tokenType, this.token)
      .subscribe(
        response => {
          console.log(response);
          this.refreshData()
        },
        error => {
          console.log(error);
        });
  }

}
