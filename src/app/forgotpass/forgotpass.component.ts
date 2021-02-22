import { Component, OnInit } from '@angular/core';
import { Auth } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { ApiHelper } from '../_services/api-helper'

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';

  constructor(
    private authService: Auth,
    private tokenStorage: TokenStorageService,
    public router: Router,
    private helper: ApiHelper
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigateByUrl('dashboard');
    }
  }

  doLogin(): void {
    const { email  } = this.form;
    if (!email) {
      this.errorMessage = "Please Fill All Form";
      return
    }
    this.helper.POST("api/user/forgotpass", this.form, "", "")
      // this.authService.login(email, password)
      .subscribe(
        data => {
          alert("Reset Password Success")
          this.router.navigateByUrl('login');
        },
        err => {
          this.errorMessage = err.error.error;
        }
      );
  }

}
