import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Bank } from 'src/app/_models/bank.model';
import { BankAccountService } from '../../_services/bank-account.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-update-bank',
  templateUrl: './update-bank.component.html',
  styleUrls: ['./update-bank.component.css']
})
export class UpdateBankComponent implements OnInit {

  id: any = ''
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
  fotoNotNull = false;
  fotoChanged = false;

  constructor(private ng2ImgMax: Ng2ImgMaxService, private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken()
    this.id = this.route.snapshot.params.id
    if(this.token != null){
      this.getBankByID(this.id)
    }else{
      this.errorMessage = 'Please login first!'
    }
  }

  getBankByID(id: string): void {
    this.bankAccountService.getBankByID(id, this.tokenType, this.token).subscribe(
      data => {
        this.bank = data.data
        if(this.bank.path_image != ""){
          this.fotoNotNull = true
          this.imageSrc.push("http://absdigital.id:55000" + this.bank.path_image)
        }
        console.log('data bank', this.bank)
      },
      err => {
        this.errorMessage = err.error.error;
      }
    )
  }

  onFileChange(event: any) {

    if(event.target.files && event.target.files.length < 5) {
      this.fotoChanged = true
      this.imageSrc = []

      const totalPhoto = event.target.files.length

      for (let i = 0; i < totalPhoto; i++) {

        const reader = new FileReader();

        this.ng2ImgMax.resizeImage(event.target.files[i], 800, 600).subscribe(
          result => {
            this.data.append("photo_detail", result)
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
    this.bankAccountService.uploadPhotoLogoMstBank(this.data, this.tokenType, this.token)
    .subscribe(
      data => {
        console.log(data);
        this.submitted = true;
        this.dataUploadPhoto = data.data
        console.log("path_image",this.dataUploadPhoto)
        this.submitted = true
        this.onUpdateBank()
      },
      error => {
        console.log(error);
      });
  }

  onUpdateBank(): void {

    if(this.data != null && this.submitted == false && this.fotoChanged == true){
      this.uploadPhoto()
    }else{
      if(this.submitted == true){
        this.bank.path_image = this.dataUploadPhoto[0].path_photo
      }
      this.bank.payment_method_type = Number(this.bank.payment_method_type)
      this.bank.status = Number(this.bank.status)

      this.bankAccountService.updateBank(this.id, this.bank, this.tokenType, this.token)
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
  }

}
