import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from '../../_services/product.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  data = new FormData()
  product_photo!: File;
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
  id: any = ''
  message = '';
  upload = false
  dataPhoto: any = []
  imageSrc: any = []

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

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

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken()
    this.id = this.route.snapshot.params.id
    if (this.token != null) {
      this.getProductByID(this.id)
      this.getAllProductCategory()
      this.getAllPromo()
    } else {
      this.message = 'Please login first!'
    }
  }

  getAllProductCategory(): void {
    if (this.token != null) {
      this.productService.getAllProductCategory(this.tokenType, this.token).subscribe(
        data => {
          this.dataProductCategory = data.data
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }

  getAllPromo(): void {
    if (this.token != null) {
      this.productService.getAllPromo(this.tokenType, this.token).subscribe(
        data => {
          this.dataPromo = data.data
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }

  getProductByID(id: any): void {
    this.productService.getProductByID(id, this.tokenType, this.token).subscribe(
      data => {
        this.product = data.data
        // this.product.Rating = [
        //   {
        //     "id_rating": "8b110ae0-a0b1-4030-b96a-43679f459c96",
        //     "id_transaction": "19c93da4-6452-41ef-af17-65b99289e333",
        //     "id_product": "rag1",
        //     "id_user": "4162feb0-fc17-493a-aa52-4dc5fd5bc7e7",
        //     "name": "Pranadipa",
        //     "rating_score": 5,
        //     "rating_desc": "mantap gan",
        //     "created_at": "2021-02-23T20:44:11.179624962+07:00",
        //     "updated_at": "2021-02-23T20:44:11.179624962+07:00"
        //   },
        //   {
        //     "id_rating": "8b110ae0-a0b1-4030-b96a-43679f459c96",
        //     "id_transaction": "19c93da4-6452-41ef-af17-65b99289e333",
        //     "id_product": "rag1",
        //     "id_user": "4162feb0-fc17-493a-aa52-4dc5fd5bc7e7",
        //     "name": "Pranadipa",
        //     "rating_score": 5,
        //     "rating_desc": "mantap gan",
        //     "created_at": "2021-02-23T20:44:11.179624962+07:00",
        //     "updated_at": "2021-02-23T20:44:11.179624962+07:00"
        //   },
        //   {
        //     "id_rating": "8b110ae0-a0b1-4030-b96a-43679f459c96",
        //     "id_transaction": "19c93da4-6452-41ef-af17-65b99289e333",
        //     "id_product": "rag1",
        //     "id_user": "4162feb0-fc17-493a-aa52-4dc5fd5bc7e7",
        //     "name": "Pranadipa",
        //     "rating_score": 5,
        //     "rating_desc": "mantap gan",
        //     "created_at": "2021-02-23T20:44:11.179624962+07:00",
        //     "updated_at": "2021-02-23T20:44:11.179624962+07:00"
        //   }
        // ]
        // console.log(">>>>>>> ", this.product)
        this.dataPhoto = data.data.Photo
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  selectedProductCategory(event: any): void {
    const valueProcat = JSON.parse(event.target.value)
    this.product.id_product_category = valueProcat.id
    this.product.name_product_category = valueProcat.name
  }

  selectedProductStatus(event: any): void {
    this.product.product_status = event.target.value
  }

  selectedPromo(event: any): void {
    const valuePromo = JSON.parse(event.target.value)
    this.product.id_promo = valuePromo.id
    this.product.promo_name = valuePromo.name
    this.product.promo_code = valuePromo.code
    this.product.promo_amount = valuePromo.disc
  }

  onFileChange(event: any) {
    this.upload = true

    if (event.target.files && event.target.files.length < 5) {
      const totalPhoto = event.target.files.length
      for (let i = 0; i < totalPhoto; i++) {
        const reader = new FileReader();
        this.data.append("photo_detail", event.target.files[i])
        reader.onload = (event: any) => {
          this.imageSrc.push(event.target.result)
        };
        reader.readAsDataURL(event.target.files[i])
      }
    } else {
      this.errorMessage = "Max. upload image 5"
    }
  }

  onUpdateProductDetails(): void {
    for (let i = 0; i < this.dataUploadPhoto.length; i++) {
      const data = {
        id_product: this.product.id_product,
        path_photo: this.dataUploadPhoto[i].path_photo
      };

      this.productService.createProductDetails(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            this.errorMessage = error.error.message;
          });
    }
    this.router.navigateByUrl('master-product'); this.router.navigateByUrl('master-product');
  }

  uploadPhoto(): void {
    this.productService.uploadPhotoProduct(this.product.id_product, this.data, this.tokenType, this.token)
      .subscribe(
        data => {
          this.dataUploadPhoto = data.data
          this.onUpdateProductDetails()
        },
        error => {
          this.errorMessage = error.error.message;
        });
  }

  onUpdateProduct(): void {
    if (this.upload == true) {
      this.uploadPhoto()
    } else {
      this.onUpdate()
    }
  }

  onUpdate(): void {
    this.productService.updateProduct(this.id, this.product, this.tokenType, this.token)
      .subscribe(
        response => {
          this.message = response.message;
          this.router.navigateByUrl('master-product');
        },
        error => {
          this.errorMessage = error.error.message;
        });
  }

}
