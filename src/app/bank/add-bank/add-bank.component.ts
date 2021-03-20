import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Bank } from 'src/app/_models/bank.model';
import { BankAccountService } from 'src/app/_services/bank-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataUploadPhoto: any = []
  data = new FormData()
  imageSrc: any = []
  errorMessage = ''

  bank: Bank = {
    name: '',
    display_name: '',
    path_image: null,
    payment_method_type: 0,
    payment_method_name: '',
    status: 1
  };

  submitted = false;

  constructor(private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
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

  selectedPaymentMethod(event: any): void {
    const valuePayMethod = JSON.parse(event.target.value)
    this.bank.payment_method_type = valuePayMethod.payment_method_type
    this.bank.payment_method_name = valuePayMethod.payment_method_name
    console.log("payment method type", this.bank.payment_method_type)
    console.log("payment method name", this.bank.payment_method_name)
  }

  selectedStatus(event: any): void {
    this.bank.status = event.target.value
    console.log("bank stat", this.bank.status)
  }

  uploadPhoto(): void {
    this.bankAccountService.uploadPhotoLogoMstBank(this.data, this.tokenType, this.token)
    .subscribe(
      data => {
        console.log(data);
        this.submitted = true;
        this.dataUploadPhoto = data.data
        console.log("path_image",this.dataUploadPhoto)
        this.onCreateBank()
      },
      error => {
        console.log(error);
      });
  }

  onCreateBank(): void {

    if(this.token != null){

      const data = {
        name: this.bank.name,
        display_name: this.bank.display_name,
        path_image: this.dataUploadPhoto[0].path_photo,
        payment_method_type: Number(this.bank.payment_method_type),
        payment_method_name: this.bank.payment_method_name,
        status: Number(this.bank.status)
      };

      this.bankAccountService.createBank(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.errorMessage = '';
            this.submitted = true;
            this.router.navigateByUrl('master-bank');
          },
          error => {
            this.errorMessage = error.error.error;
      });
    }else{
      console.log('error', 'Please login first!')
    }
  }

}