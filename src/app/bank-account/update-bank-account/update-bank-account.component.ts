import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { BankAccount } from 'src/app/_models/bank-account.model';
import { BankAccountService } from '../../_services/bank-account.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-bank-account',
  templateUrl: './update-bank-account.component.html',
  styleUrls: ['./update-bank-account.component.css']
})
export class UpdateBankAccountComponent implements OnInit {

  logo_bank_photo!: File;
  photo_name: any = null
  id: any = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataBank: any = []
  dataUploadPhoto: any = []
  errorMessage = ''
  imageSrc: string = ''

  constructor(private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  bankAccount: BankAccount = {
    bank_name: '',
    account_number: '',
    account_name: '',
    path_photo: ''
  };
  message = '';
  upload = false

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
    this.id = this.route.snapshot.params.id
    if(this.token != null){
      this.getBankAccountByID(this.id)
    }else{
      this.message = 'Please login first!'
    }
  }

  

  onFileChange(event: any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [logo] = event.target.files;
      this.logo_bank_photo = logo
      this.photo_name = logo.name
      this.upload = true
      reader.readAsDataURL(logo);
      console.log("photo", logo)
      console.log("photo name", logo.name)
      console.log("logo bank", this.logo_bank_photo)
      
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log("url image", this.imageSrc)
      };
   
    }
  }

  uploadPhoto(): void {
    console.log("photoup", this.logo_bank_photo)
    this.bankAccountService.uploadPhotoLogoBank(this.id, this.logo_bank_photo, this.tokenType, this.token)
    .subscribe(
      data => {
        console.log(data);
        this.dataUploadPhoto = data.data
        this.bankAccount.path_photo = this.dataUploadPhoto[0].path_photo
        console.log("path_foto",this.bankAccount.path_photo)
        this.onUpdate()
      },
      error => {
        console.log(error);
      });
  }

  getBankAccountByID(id: string): void {
    this.bankAccountService.getBankAccountByID(id, this.tokenType, this.token).subscribe(
      data => {
        this.bankAccount = data.data
        if(this.bankAccount.path_photo != ""){
            this.imageSrc = "http://absdigital.id:5000" + this.bankAccount.path_photo
        }
        console.log('data bank', this.bankAccount)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  onUpdateBank(): void {
    if(this.upload == true){
      this.uploadPhoto()
    }else{
      this.onUpdate()
    }
  }

  onUpdate(): void {
    this.bankAccountService.update(this.id, this.bankAccount, this.tokenType, this.token)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          this.router.navigateByUrl('master-bank-account');
        },
        error => {
          console.log(error);
        });
  }

}
