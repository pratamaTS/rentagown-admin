import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product_photo: File | undefined
  path_photo: any = ''
  id_selected_promo: any = ''
  id_selected_procat: any = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataProductCategory: any = []
  dataPromo: any = []
  dataProcatByID: any = []
  dataPromoByID: any = []
  dataUploadPhoto: any = []
  errorMessage = ''
  promo_name = ''
  promo_code = ''
  promo_amount = ''
  imageSrc: string = ''

  product: Product = {
    id_product: '',
    product_name: '',
    product_price: 0,
    product_desc: '',
    product_status: 0,
    product_quantity: 0,
    id_product_category: '',
    name_product_category: '',
    id_promo: '',
    promo_code: '',
    promo_name: '',
    promo_amount: 0,
    id_user: '',
    name: ''
  };

  submitted = false;
  

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
    this.getAllProductCategory()
    this.getAllPromo()
  }

  getAllProductCategory(): void {
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

  getAllPromo(): void {
    if(this.token != null){
      this.productService.getAllPromo(this.tokenType, this.token).subscribe(
        data => {
          this.dataPromo = data.data
          console.log('data promo', this.dataPromo)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }

  getPromoByID(): void{
    
    if(this.token != null){
      this.productService.getPromoByID(this.id_selected_promo, this.tokenType, this.token).subscribe(
        data => {
          this.dataPromoByID = data.data

          this.product.promo_code = this.dataPromoByID.promo_code
          this.product.promo_name = this.dataPromoByID.promo_name
          this.product.promo_amount = this.dataPromoByID.promo_amount
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }

  getProcatByID(): void{
    
    if(this.token != null){
      this.productService.getProductCategoryByID(this.id_selected_procat, this.tokenType, this.token).subscribe(
        data => {
          this.dataProcatByID = data.data

          this.product.name_product_category = this.dataProcatByID.name_product_category
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }

  selectedProductCategory(event: any) {
    this.id_selected_procat = event.target.value

    this.getProcatByID()    
  }

  selectedProductStatus(event: any) {
    this.product.product_status = event.target.value
    console.log("prod stat", this.product.product_status)
  }

  selectedPromo(event: any) {
    this.id_selected_promo = event.target.value

    this.getPromoByID()    
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [product_photo] = event.target.files;
      this.product_photo = product_photo
      reader.readAsDataURL(product_photo);
      console.log("photo", product_photo)
      console.log("photoprod", this.product_photo)
      
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log("url image", this.imageSrc)
      };
   
    }
  }

  onCreateProductDetails(): void {
    const data = {
      id_product: this.product.id_product,
      path_photo: this.dataUploadPhoto.path_photo
    };

    this.productService.createProductDetails(data, this.tokenType, this.token)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;

        this.router.navigateByUrl('master-product');
      },
      error => {
        console.log(error);
      });
  }

  uploadPhoto(): void {
    console.log("photoup", this.product_photo)
    this.productService.uploadPhotoProduct(this.product.id_product, this.product_photo, this.tokenType, this.token)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.dataUploadPhoto = response.data
        this.onCreateProductDetails()
      },
      error => {
        console.log(error);
      });
  }

  onCreateProduct(): void {

    if(this.token != null){
      const data = {
        id_product: this.product.id_product,
        product_name: this.product.product_name,
        product_price: this.product.product_price,
        product_desc: this.product.product_desc,
        product_status: Number(this.product.product_status),
        product_quantity: this.product.product_quantity,
        id_product_category: this.product.id_product_category,
        name_product_category: this.product.name_product_category,
        id_promo: this.product.id_promo,
        promo_code: this.product.promo_code,
        promo_name: this.product.promo_name,
        promo_amount: this.product.promo_amount,
        id_user: '',
        name: ''
      };

      this.productService.createProduct(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.uploadPhoto()
          },
          error => {
            console.log(error);
      });
    }else{
      console.log('error', 'Please login first!')
    }
  }

}
