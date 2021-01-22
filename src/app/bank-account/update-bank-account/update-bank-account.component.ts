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

  id: any = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataBank: any = []
  errorMessage = ''

  constructor(private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  bankAccount: BankAccount = {
    bank_name: '',
    account_number: '',
    account_name: ''
  };
  message = '';

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

  getBankAccountByID(id: string): void {
    this.bankAccountService.getBankAccountByID(id, this.tokenType, this.token).subscribe(
      data => {
        this.bankAccount = data.data
        console.log('data bank', this.bankAccount)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  onUpdateBank(): void {
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
