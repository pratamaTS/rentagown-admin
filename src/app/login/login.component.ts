import { Component, OnInit } from '@angular/core';
import { Auth } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProfileService } from '../_services/profile.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = '';

  constructor(private authService: Auth, private profileService: ProfileService,
    private tokenStorage: TokenStorageService, public router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigateByUrl('dashboard');
    }
  }

  doLogin(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        this.profileService.getProfile('Bearer', data.data.access_token).subscribe(
          (d: any) => {
            if (d.data.role == "Admin") {
              this.tokenStorage.saveToken(data.data.access_token);
              this.tokenStorage.saveRefreshToken(data.data.refresh_token);
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              window.location.href = "dashboard";
            } else {
              this.errorMessage = "Only Admin Allowed";
            }
          },
          (profErr: any) => {
            this.errorMessage = profErr.error.message;
          }
        )
        //kadang error navigation gak bisa di klik dropdown
        // this.router.navigateByUrl('dashboard');
      },
      err => {
        this.errorMessage = err.error.error;
        this.isLoginFailed = true;
      }
    );
  }

}
