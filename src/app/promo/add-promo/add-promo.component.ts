import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Promo } from 'src/app/_models/promo.model';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiHelper } from '../../_services/api-helper';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {
  dataProductCategory: any;

  id: any = ''
  data = new FormData()
  tokenType: String = 'Bearer'
  token: String | null = ''
  errorMessage = ''
  imageSrc: any = []
  photo_name: any = null
  dataUploadPhoto: any = []
  pipe = new DatePipe('en-US');

  promo: Promo = {
    promo_name: '',
    promo_code: '',
    promo_desc: '',
    promo_amount: 0,
    promo_exp: '',
    terms_conditions: '',
    promo_stock: 0,
    id_product_category: '',
    path_photo: ''
  }

  submitted = false

  constructor(private ng2ImgMax: Ng2ImgMaxService, private tokenStorage: TokenStorageService, private productService: ProductService, private router: Router, private helper: ApiHelper) { }

  ngOnInit(): void {
    this.getAllProductCategory()
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
  }

  onFileChange(event: any) {

    if(event.target.files && event.target.files.length < 2) {
      const totalPhoto = event.target.files.length

      for (let i = 0; i < totalPhoto; i++) {

        const reader = new FileReader();

        this.ng2ImgMax.resizeImage(event.target.files[i], 500, 800).subscribe(
          result => {
            this.data.append("photo_detail", result)
            this.submitted = true;
            console.log("result resize", result)
          },
          error => {
            console.log('Failed to resize image!', error);
          }
        );

        reader.onload = (event:any) => {
          this.imageSrc.push(event.target.result)
        };

        reader.readAsDataURL(event.target.files[i])
      }
    }else{
      this.errorMessage = "Max. upload image 1"
    }
  }

  dateInput(event: any): void {
    const valueDate = event.target.value
    this.promo.promo_exp = '06-02-2021'
    console.log("value date", this.promo.promo_exp)
  }

  onCreatePromo(): void {

    if(this.token != null){
      const data = {
        promo_name: this.promo.promo_name,
        promo_desc: this.promo.promo_desc,
        promo_amount: Number(this.promo.promo_amount),
        promo_exp: this.helper.ApiDate(this.promo.promo_exp)+" 00:00:00",
        terms_conditions: this.promo.terms_conditions,
        promo_stock: Number(this.promo.promo_stock),
        id_product_category: this.promo.id_product_category,
        promo_start: this.helper.ApiDate(this.promo.promo_start)+" 00:00:00",
        path_photo: this.dataUploadPhoto[0].path_photo
      };

      this.productService.createPromo(data, this.tokenType, this.token)
        .subscribe(
          data => {
            this.id = data.data.id_promo
            // this.uploadPhoto()
            this.submitted = true;
            this.router.navigateByUrl('master-promo')
          },
          error => {
            this.errorMessage = error.error.error;
      });
    }else{
      console.log('error', 'Please login first!')
    }
  }


  StartdateInput(event: any): void {
    const valueDate = event.target.value
    this.promo.promo_start = valueDate
  }

  getAllProductCategory(): void {
    if (this.token != null) {
      this.productService.getAllProductCategory(this.tokenType, this.token).subscribe(
        data => {
          this.dataProductCategory = data.data
          console.log('data product category', this.dataProductCategory)
        },
        err => {
          this.errorMessage = err.error.error;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }
  selectedProductCategory(event: any): void {
    const valueProcat = JSON.parse(event.target.value)
    this.promo.id_product_category = valueProcat.id

  }

  uploadPhoto(): void {
    if(this.submitted == false){
      this.errorMessage = "Promo image is required"
    }else if(this.promo.promo_name == null || this.promo.promo_name == ""){
      this.errorMessage = "Promo name is required"
    }else if(this.promo.id_product_category == null || this.promo.id_product_category == ""){
      this.errorMessage = "Promo category is required"
    }else if(this.promo.promo_amount == null || this.promo.promo_amount == 0){
      this.errorMessage = "Discount can't be 0"
    }else if(this.promo.promo_stock == null || this.promo.promo_stock == 0){
      this.errorMessage = "Promo stock can't be 0"
    }else if(this.promo.promo_start == null || this.promo.promo_start == ""){
      this.errorMessage = "Promo period start is required"
    }else if(this.promo.promo_exp == null || this.promo.promo_exp == ""){
      this.errorMessage = "Promo period expired is required"
    }else {
      this.productService.uploadPhotoPromo(this.data, this.tokenType, this.token)
      .subscribe(
        data => {
          console.log("data response",data);
          this.dataUploadPhoto = data.data
          console.log("path_image",this.dataUploadPhoto)
          this.onCreatePromo()
        },
        error => {
          this.errorMessage = error.error.error;
        });
    }
  }

  onCreatePromoDetails(): void {
    const data = {
      path_photo: this.dataUploadPhoto[0].path_photo
    };

    this.productService.updatePromo(this.id, data, this.tokenType, this.token)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        this.errorMessage = error.error.error;
      });
    this.router.navigateByUrl('master-promo')
  }
}
