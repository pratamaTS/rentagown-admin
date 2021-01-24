import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { BankAccountService } from '../_services/bank-account.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataBank: any = []
  errorMessage = ''

  constructor(private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if(this.token != null){
      this.bankAccountService.getAllBankAccount(this.tokenType, this.token).subscribe(
        data => {
          this.dataBank = data.data
          console.log('data bank', this.dataBank)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }else{
      console.log('error', 'Please login first!')
    }
  }

  refreshData(): void {
    this.bankAccountService.getAllBankAccount(this.tokenType, this.token).subscribe(
      data => {
        this.dataBank = data.data
        console.log('data bank', this.dataBank)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  onDeleteBank(id: any): void {
    const data = {
      id_bank: id
    };
    this.bankAccountService.delete(id, data, this.tokenType, this.token)
      .subscribe(
        response => {
          console.log(response);
          this.refreshData()
        },
        error => {
          console.log(error);
        });
  }

}
