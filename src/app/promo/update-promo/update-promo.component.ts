import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Promo } from 'src/app/_models/promo.model';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '../../_services/api-helper'
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-update-promo',
  templateUrl: './update-promo.component.html',
  styleUrls: ['./update-promo.component.css']
})
export class UpdatePromoComponent implements OnInit {
  dataProductCategory: any;
  id: any = ''
  data = new FormData()
  tokenType: String = 'Bearer'
  token: String | null = ''
  errorMessage = ''
  imageSrc: any = []
  photo_name: any = null
  dataUploadPhoto: any = []
  isLoading: any;
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

  message = ''
  submitted = false
  upload = false

  constructor(private ng2ImgMax: Ng2ImgMaxService, private tokenStorage: TokenStorageService, private productService: ProductService, private route: ActivatedRoute, private router: Router, private helper: ApiHelper) { }

  ngOnInit(): void {
    this.getAllProductCategory()
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
    this.id = this.route.snapshot.params.id

    if (this.token != null) {
      this.getPromoByID(this.id)
    } else {
      this.message = 'Please login first!'
    }
  }

  getPromoByID(id: any): void {
    this.productService.getPromoByID(id, this.tokenType, this.token).subscribe(
      data => {
        this.promo = data.data
        if (data.data.path_photo != "") {
          this.imageSrc.push("https://apps.rentagown.id:50443" + this.promo.path_photo)
        }
        console.log('data PRomo', this.promo)
      },
      err => {
        this.errorMessage = err.error.error;
      }
    )
  }
  selectedProductCategory(event: any): void {
    const valueProcat = JSON.parse(event.target.value)
    this.promo.id_product_category = valueProcat.id

  }

  onFileChange(event: any) {

    if(event.target.files && event.target.files.length < 2) {
      const totalPhoto = event.target.files.length
      this.upload = true

      this.imageSrc = []

      for (let i = 0; i < totalPhoto; i++) {

        const reader = new FileReader();

        this.ng2ImgMax.resizeImage(event.target.files[i], 500, 800).subscribe(
          result => {
            this.data.append("photo_detail", result)
            console.log("result resize", result)
          },
          error => {
            console.log('Failed to resize image!', error);
          }
        );

        console.log("photo", event.target.files)

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
    this.promo.promo_exp = valueDate
  }

  StartdateInput(event: any): void {
    const valueDate = event.target.value
    this.promo.promo_start = valueDate
  }

  onUpdatePromo(): void {
    if(this.promo.promo_name == null || this.promo.promo_name == ""){
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
      if (this.upload == true) {
        this.uploadPhoto()
      } else {
        this.onUpdate()
      }
    }
  }

  onUpdate(): void {
    this.isLoading = true
    let data = null
    if (this.token != null) {

      if(this.upload == false){
        data = {
          promo_name: this.promo.promo_name,
          promo_desc: this.promo.promo_desc,
          promo_amount: Number(this.promo.promo_amount),
          promo_exp: this.helper.ApiDate(this.promo.promo_exp)+" 00:00:00",
          terms_conditions: this.promo.terms_conditions,
          promo_stock: Number(this.promo.promo_stock),
          id_product_category: this.promo.id_product_category,
          promo_start: this.helper.ApiDate(this.promo.promo_start)+" 00:00:00",
          path_photo: this.promo.path_photo
        };
      }else{
        data = {
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
      }

      this.productService.updatePromo(this.id, data, this.tokenType, this.token)
        .subscribe(
          data => {
            this.id = data.data.id_promo
            this.submitted = true;
            this.isLoading = false
            this.upload = false
            this.router.navigateByUrl('master-promo')
          },
          error => {
            this.isLoading = false
            if (error.error)
              this.errorMessage = error.error.error;
            else
              this.errorMessage = "Server Error";
          });
    } else {
      console.log('error', 'Please login first!')
    }
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

  uploadPhoto(): void {
    this.productService.uploadPhotoPromo(this.data, this.tokenType, this.token)
      .subscribe(
        data => {
          console.log(data);
          this.submitted = true;
          this.dataUploadPhoto = data.data
          console.log("path_foto", this.dataUploadPhoto)
          this.onUpdate()
        },
        error => {
          this.errorMessage = error.error.error;
        });
  }

  onUpdatePromoDetails(): void {
    for (let i = 0; i < this.dataUploadPhoto.length; i++) {
      const data = {
        id_promo: this.id,
        path_photo: this.dataUploadPhoto[i].path_photo
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
    }
    this.router.navigateByUrl('master-promo')
  }

}
