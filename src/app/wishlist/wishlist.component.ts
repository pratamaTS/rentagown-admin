import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProductService } from '../_services/product.service'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataWishlist: any = []
  errorMessage = ''

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.productService.getAllWishlist(this.tokenType, this.token).subscribe(
        data => {
          this.dataWishlist = data.data
          console.log('data wishlist', this.dataWishlist)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }

}
