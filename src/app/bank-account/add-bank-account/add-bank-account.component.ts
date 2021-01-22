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

  bankAccount: BankAccount = {
    bank_name: '',
    account_name: '',
    account_number: ''
  };

  submitted = false;

  constructor(private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
  }

  onCreateBank(): void {

    if(this.token != null){
      const data = {
        bank_name: this.bankAccount.bank_name,
        account_name: this.bankAccount.account_name,
        account_number: this.bankAccount.account_number
      };

      this.bankAccountService.create(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.router.navigateByUrl('master-bank-account');
          },
          error => {
            console.log(error);
      });
    }else{
      console.log('error', 'Please login first!')
    }
  }

}
