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
  EditMode: boolean = false
  adduser: any = {}
  SearchObj: any = {}

  constructor(private tokenStorage: TokenStorageService,
    private helper: ApiHelper,
    private userService: UserService) { }

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

  refreshData(): void {
    this.userService.getAllUser(this.tokenType, this.token).subscribe(
      data => {
        this.Realdata = data.data
        this.dataUser = data.data
        this.filterBytext(this.SearchObj.text || '')
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  filterData(test: any): void {
    let f = test.target.value.trim()
    this.SearchObj = {}
    this.filterBytext(f)
  }

  filterBytext(f: any): void {
    let myRealdata = JSON.parse(JSON.stringify(this.Realdata));
    this.dataUser = myRealdata.filter((d: any) => {
      let txtBool = d.name.includes(f) || d.email.includes(f) || d.role.includes(f)
      let roleBool = false
      let statusBool = false
      if (this.SearchObj.role) {
        roleBool = (d.role == this.SearchObj.role)
        return roleBool
      }
      if (this.SearchObj.status === 1 || this.SearchObj.status === 0) {
        statusBool = (d.status === this.SearchObj.status)
        return statusBool
      }
      // console.log("roleBool", roleBool)
      // if (roleBool || statusBool) {
      // return  (roleBool || statusBool)
      // }
      // if (statusBool) {
      //   return statusBool
      // }
      // if (roleBool) {
      //   return roleBool
      // }

      if (f == '') return true

      // return txtBool && (roleBool || statusBool)
      return txtBool
    })
  }

  RefreshFilter() {
    this.filterBytext(this.SearchObj.text || '')

  }
  FilterMode(x: any): void {
    if (x == 'all') {
      this.SearchObj = {}
      this.filterBytext('')
    }
    if (x == 'admin') {
      this.SearchObj.role = 'Admin'
      delete this.SearchObj.status
      this.RefreshFilter()
    }
    if (x == 'user') {
      this.SearchObj.role = 'User'
      delete this.SearchObj.status
      this.RefreshFilter()
    }
    if (x == 'active') {
      this.SearchObj.status = 1
      delete this.SearchObj.role
      this.RefreshFilter()
    }
    if (x == 'inactive') {
      this.SearchObj.status = 0
      delete this.SearchObj.role
      this.RefreshFilter()
    }
  }
  DeleteUser(id: string): void {
    const data = {
      id_user: id
    };
    let myconfirm = confirm("Are You Sure?");
    if (!myconfirm) return
    this.userService.deleteUser(data, this.tokenType, this.token)
      .subscribe(
        response => {
          this.refreshData()
          alert("User Deleted")
        },
        error => {
          this.errorMessage = error.error.error;
        });
  }

  ChangeRole(uData: any): void {
    console.log(uData)
    let mydata = {
      "role": (uData.role == 'Admin') ? 'User' : 'Admin'
    }
    this.helper.PUT("api/user/admin/update/" + uData.id_user, mydata, this.tokenType, this.token)
      .subscribe(
        (d: any) => {
          console.log("update ROle >>>> ", d)
          this.errorMessage = '';
          this.EditMode = false
          this.refreshData()
          alert("Success Update User Role")
        },
        (err: any) => {
          this.errorMessage = err.error.error;
        }
      );
  }

  ChangeStatus(uData: any): void {
    console.log(uData)
    let mydata = {
      "id_user": uData.id_user
    }
    this.helper.PUT("api/user/update/status", mydata, this.tokenType, this.token)
      .subscribe(
        (d: any) => {

          this.errorMessage = '';
          this.EditMode = false
          this.refreshData()
          alert("Success Change Status User")
        },
        (err: any) => {
          this.errorMessage = err.error.error;
        }
      );
  }
  Createuser(): void {
    const { email, password, name, phone } = this.adduser;
    if (!email || !password || !name || !phone) {
      this.errorMessage = "Please Fill All Form";
      return
    }
    this.adduser.phone = this.adduser.phone.toString()
    this.helper.POST("api/user", this.adduser, "", "")
      // this.authService.login(email, password)
      .subscribe(
        (d: any) => {
          this.errorMessage = '';
          this.EditMode = false
          this.refreshData()
          alert("Success Add User")
        },
        (err: any) => {
          this.errorMessage = err.error.error;
        }
      );
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
