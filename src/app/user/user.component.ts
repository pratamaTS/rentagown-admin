import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service'
import { ApiHelper } from '../_services/api-helper'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tokenType: String = 'Bearer'
  token: String | null = ''
  dataUser: any = []
  errorMessage = ''
  Realdata: any = []

  constructor(private tokenStorage: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()

    if (this.token != null) {
      this.userService.getAllUser(this.tokenType, this.token).subscribe(
        data => {
          this.dataUser = data.data
          this.Realdata = data.data
          this.dtTrigger.next();

          console.log('data user', this.dataUser)
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    } else {
      console.log('error', 'Please login first!')
    }
  }

  filterData(test: any): void {
    let f = test.target.value.trim()
    this.dataUser = this.Realdata.filter((d: any) => {
      if (f == '') return true
      return (d.name.includes(f) || d.email.includes(f) || d.role.includes(f))
    })
  }

  DeleteUser(id: string): void {
    console.log("test >>>>>>>>>>> ", id)
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
