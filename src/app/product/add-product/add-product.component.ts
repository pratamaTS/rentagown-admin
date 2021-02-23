import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product_photo!: FileList
  data = new FormData()
  photo_name: any = null
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
  imageSrc: any = []

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
          this.errorMessage = err.error.error;
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
          this.errorMessage = err.error.error;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }

  selectedProductCategory(event: any): void {
    const valueProcat = JSON.parse(event.target.value)
    this.product.id_product_category = valueProcat.id
    this.product.name_product_category = valueProcat.name
    console.log("procat id", this.id_selected_procat)
    console.log("procat name", this.product.name_product_category)
  }

  selectedProductStatus(event: any): void {
    this.product.product_status = event.target.value
    console.log("prod stat", this.product.product_status)
  }

  selectedPromo(event: any): void {
    const valuePromo = JSON.parse(event.target.value)
    
    this.product.id_promo = valuePromo.id
    this.product.promo_name = valuePromo.name
    this.product.promo_code = valuePromo.code
    this.product.promo_amount = valuePromo.disc

    console.log("promo id", this.product.id_promo)
    console.log("promo name", this.product.promo_name)
    console.log("promo code", this.product.promo_code)
    console.log("promo amount", this.product.promo_amount)
  }

  onFileChange(event: any) {
    
    if(event.target.files && event.target.files.length < 5) {
      const totalPhoto = event.target.files.length
      
      for (let i = 0; i < totalPhoto; i++) {
        
        const reader = new FileReader();
        
        this.data.append("photo_detail", event.target.files[i])
        
        console.log("photo", event.target.files)
        
        reader.onload = (event:any) => {
          this.imageSrc.push(event.target.result)
        };

        reader.readAsDataURL(event.target.files[i])
      }
    }else{
      this.errorMessage = "Max. upload image 5"
    }
  }

  onCreateProductDetails(): void {
    for(let i = 0; i < this.dataUploadPhoto.length; i++){
      const data = {
        id_product: this.product.id_product,
        path_photo: this.dataUploadPhoto[i].path_photo
      };
      
      this.productService.createProductDetails(data, this.tokenType, this.token)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          this.errorMessage = error.error.error;
        });
    }
    this.router.navigateByUrl('master-product')
  }

  uploadPhoto(): void {
    this.productService.uploadPhotoProduct(this.product.id_product, this.data, this.tokenType, this.token)
    .subscribe(
      data => {
        console.log(data);
        this.submitted = true;
        this.dataUploadPhoto = data.data
        console.log("path_foto",this.dataUploadPhoto)
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
        promo_amount: Number(this.product.promo_amount),
        id_user: '',
        name: ''
      };
      if (!data.product_name || 
        !data.id_product  || 
        !data.id_product || 
        !data.id_product_category ||
        !data.product_status ||
        !data.product_quantity ||
        !data.product_price
        ) {
        this.errorMessage = "Please Fill All Required Form";
        return
      }

      this.productService.createProduct(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.uploadPhoto()
          },
          error => {
            this.errorMessage = error.error.error;
      });
    }else{
      console.log('error', 'Please login first!')
    }
  }

}
