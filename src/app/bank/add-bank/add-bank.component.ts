import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Bank } from 'src/app/_models/bank.model';
import { BankAccountService } from 'src/app/_services/bank-account.service';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
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
    payment_method_type: null,
    payment_method_name: '',
    status: null
  };

  submitted = false;

  constructor(private ng2ImgMax: Ng2ImgMaxService, private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
  }

  onFileChange(event: any) {

    if(event.target.files && event.target.files.length < 5) {
      const totalPhoto = event.target.files.length

      for (let i = 0; i < totalPhoto; i++) {

        const reader = new FileReader();

        this.ng2ImgMax.resizeImage(event.target.files[i], 800, 600).subscribe(
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
    if(this.bank.name != "other bank" && this.submitted == false){
      this.errorMessage = "Logo bank is required"
    }else if(this.bank.name == null || this.bank.name == ""){
      this.errorMessage = "Corporate name is required"
    }else if(this.bank.display_name == null || this.bank.display_name == ""){
      this.errorMessage = "Bank name is required"
    }else if(this.bank.payment_method_type == null){
      this.errorMessage = "Payment method is required"
    }else if(this.bank.status == null){
      this.errorMessage = "Activated bank is required"
    }else{
      this.bankAccountService.uploadPhotoLogoMstBank(this.data, this.tokenType, this.token)
      .subscribe(
        data => {
          console.log(data);
          this.dataUploadPhoto = data.data
          console.log("path_image",this.dataUploadPhoto)
          this.onCreateBank()
        },
        error => {
          console.log(error);
        });
    }
  }

  onCreateBank(): void {
    if(this.token != null){
      if(this.bank.name == "other bank"){
        const data = {
          name: this.bank.name,
          display_name: this.bank.display_name,
          path_image: "",
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
      }
    }else{
      console.log('error', 'Please login first!')
    }
  }

}
