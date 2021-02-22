import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { BankAccountService } from '../_services/bank-account.service'
import { ActivatedRoute, Router } from '@angular/router'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataBank: any = []
  errorMessage = ''
  Realdata: any = []

  constructor(private tokenStorage: TokenStorageService, private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.bankAccountService.getAllBankAccount(this.tokenType, this.token).subscribe(
        data => {
          this.dataBank = data.data
          this.Realdata = data.data

          this.dtTrigger.next();

          console.log('data bank', this.dataBank)
        },
        err => {
          this.errorMessage = err.error.error;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }

  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataBank = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.bank_name.includes(f) || d.account_number.includes(f))
    })
  }
  refreshData(): void {
    this.bankAccountService.getAllBankAccount(this.tokenType, this.token).subscribe(
      data => {
        this.dataBank = data.data
        console.log('data bank', this.dataBank)
      },
      err => {
        this.errorMessage = err.error.error;
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
          this.refreshData()
          this.errorMessage = '';
        },
        err => {
          this.errorMessage = err.error.error;
        });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
