import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Promo } from 'src/app/_models/promo.model';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '../../_services/api-helper'

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
  imageSrc: any = null
  photo_name: any = null
  dataUploadPhoto: any = []
  isLoading: any;
  promo: Promo = {
    promo_name: '',
    promo_code: '',
    promo_amount: 0,
    promo_exp: '',
    terms_conditions: '',
    promo_stock: 0,
    id_product_category: ''
  }

  message = ''
  submitted = false
  upload = false

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService, private route: ActivatedRoute, private router: Router, private helper: ApiHelper) { }

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
          this.imageSrc = "http://absdigital.id:5000" + data.data.path_photo
        }
        console.log('data bank', this.promo)
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

    const reader = new FileReader();
    if (event.target.files && event.target.files.length < 5) {
      const [promo] = event.target.files;
      this.data.append("photo_detail", event.target.files)
      this.photo_name = promo.name
      this.upload = true

      reader.readAsDataURL(promo);
      console.log("photo", promo)
      console.log("photo name", promo.name)

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log("url image", this.imageSrc)
      };
    } else {
      this.errorMessage = "Max. upload image 5"
    }
  }

  dateInput(event: any): void {
    const valueDate = event.target.value
    this.promo.promo_exp = '06-02-2021'
    console.log("value date", this.promo.promo_exp)
  }

  onUpdatePromo(): void {
    if (this.upload == true) {
      this.uploadPhoto()
    } else {
      this.onUpdate()
    }
  }

  onUpdate(): void {
    this.isLoading = true
    if (this.token != null) {
      const data = {
        promo_name: this.promo.promo_name,
        promo_code: this.promo.promo_code,
        promo_amount: Number(this.promo.promo_amount),
        promo_exp: this.helper.ApiDate(this.promo.promo_exp),
        terms_conditions: this.promo.terms_conditions,
        promo_stock:  this.promo.promo_stock,
        id_product_category: this.promo.id_product_category,
      };

      this.productService.updatePromo(this.id, data, this.tokenType, this.token)
        .subscribe(
          data => {
            this.id = data.data.id_promo
            this.submitted = true;
            this.isLoading = false
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
    this.productService.uploadPhotoPromo(this.id, this.data, this.tokenType, this.token)
      .subscribe(
        data => {
          console.log(data);
          this.submitted = true;
          this.dataUploadPhoto = data.data
          console.log("path_foto", this.dataUploadPhoto)
          this.onUpdatePromoDetails()
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
