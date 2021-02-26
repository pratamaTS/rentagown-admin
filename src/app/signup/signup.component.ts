import { Component, OnInit } from '@angular/core';
import { Auth } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { ApiHelper } from '../_services/api-helper'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
    const { email, password, name, phone } = this.form;
    if (!email || !password || !name || !phone) {
      this.errorMessage = "Please Fill All Form";
      return
    }
    this.form.phone = this.form.phone.toString()
    this.form.platform = "WEB"
    this.helper.POST("api/user", this.form, "", "")
      // this.authService.login(email, password)
      .subscribe(
        data => {
          alert("Sign up Success")
          this.router.navigateByUrl('login');
        },
        err => {
          this.errorMessage = err.error.error;
        }
      );
  }

}
