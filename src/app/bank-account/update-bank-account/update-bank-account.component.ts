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
  dataUploadPhoto: any = []
  errorMessage = ''
  url: string = ''
  bankName = ''
  dataBank: any = []

  constructor(private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  bankAccount: BankAccount = {
    id_mst_bank: '',
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
      this.getBank()
    }else{
      this.message = 'Please login first!'
    }
  }

  getBank(): void {
    this.bankAccountService.getAllBank(this.tokenType, this.token).subscribe(
      data => {
        const mData = data.data

        mData.forEach((value: any,index: any)=>{
          if(value.display_name=="OTHER BANK") mData.splice(index,1)
        });

        this.dataBank = mData
      },
      err => {
        this.errorMessage = err.error.error;
      }
    )
  }

  selectedBank(event: any): void {
    const valueBank = JSON.parse(event.target.value)
    this.bankAccount.id_mst_bank = valueBank.id_mst_bank
    this.bankName = valueBank.display_name
    this.bankAccount.path_photo = valueBank.path_photo
    this.url = "https://apps.rentagown.id:50443"+this.bankAccount.path_photo
  }

  getBankAccountByID(id: string): void {
    this.bankAccountService.getBankAccountByID(id, this.tokenType, this.token).subscribe(
      data => {
        this.bankAccount = data.data
        this.bankName = data.data.bank_name
        if(this.bankAccount.path_photo != ""){
            this.url = "https://apps.rentagown.id:50443" + this.bankAccount.path_photo
        }
      },
      err => {
        this.errorMessage = err.error.error;
      }
    )
  }

  onUpdateBank(): void {
    if(this.bankAccount.id_mst_bank == null || this.bankAccount.id_mst_bank == ""){
      this.errorMessage = "Bank is required"
    }else if(this.bankAccount.account_name == null || this.bankAccount.account_name == ""){
      this.errorMessage = "Account name is required"
    }else if(this.bankAccount.account_number == null || this.bankAccount.account_number == ""){
      this.errorMessage = "Account number is required"
    }else{
      this.bankAccountService.update(this.id, this.bankAccount, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message;
            this.router.navigateByUrl('master-bank-account');
          },
          error => {
            this.errorMessage = error.error.error;
          });
    }
  }

}
