import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { ProductService } from '../../_services/product.service'
import { ProductCategory } from '../../_models/product-category.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.css']
})
export class UpdateProductCategoryComponent implements OnInit {

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
  }

  onUpdateProductCategory(id: any): void {
    this.productService.updateProductCategory(this.id, this.productCategory, this.tokenType, this.token)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          this.router.navigateByUrl('master-product-category');
        },
        error => {
          console.log(error);
        });
  }
}
