import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Promo } from 'src/app/_models/promo.model';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {

  tokenType: String = 'Bearer'
  token: String | null = ''
  errorMessage = ''

  promo: Promo = {
    promo_name: '',
    promo_code: '',
    promo_amount: 0,
    promo_exp: '',
    terms_conditions: '',
    promo_stock: 0
  }

  submitted = false

  constructor(private tokenStorage: TokenStorageService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
  }

  onCreatePromo(): void {

    if(this.token != null){
      const data = {
        promo_name: this.promo.promo_name,
        promo_code: this.promo.promo_stock,
        promo_amount: this.promo.promo_amount,
        promo_exp: this.promo.promo_exp,
        terms_conditions: this.promo.terms_conditions,
        promo_stock: this.promo.promo_stock
      };

      this.productService.createPromo(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.router.navigateByUrl('master-promo');
          },
          error => {
            console.log(error);
      });
    }else{
      console.log('error', 'Please login first!')
    }
  }

}
