import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { BankAccount } from 'src/app/_models/bank-account.model';
import { BankAccountService } from 'src/app/_services/bank-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css']
})
export class AddBankAccountComponent implements OnInit {

  tokenType: String = 'Bearer'
  token: String | null = ''
  errorMessage = ''
  dataBank: any = []
  url = ""
  bankName = ""

  bankAccount: BankAccount = {
    id_mst_bank: '',
    account_name: '',
    account_number: '',
    path_photo: null
  };

  submitted = false;

  constructor(private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
    this.getBank()
  }

  getBank(): void {
    this.bankAccountService.getAllBank(this.tokenType, this.token).subscribe(
      data => {
        this.dataBank = data.data
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
    this.url = "http://absdigital.id:55000"+this.bankAccount.path_photo
  }

  onCreateBank(): void {

    if(this.token != null){
      const data = {
        id_mst_bank: this.bankAccount.id_mst_bank,
        account_name: this.bankAccount.account_name,
        account_number: this.bankAccount.account_number?.toString(),
        path_photo: this.bankAccount.path_photo
      };

      this.bankAccountService.create(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.errorMessage = '';
            this.submitted = true;
            this.router.navigateByUrl('master-bank-account');
          },
          error => {
            this.errorMessage = error.error.error;
      });
    }else{
      console.log('error', 'Please login first!')
    }
  }

}
