import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service'
import { ProfileService } from '../../_services/profile.service';
import { User } from '../../_models/user.model'
import { Router } from '@angular/router';
import { ApiHelper } from '../../_services/api-helper'

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  id: any = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  dataUploadPhoto: any = []
  data = new FormData()
  imageSrc: any = []
  errorMessage = ''
  dataUser: any;
  upload = false

  user: User = {
    name: '',
    email: '',
    password: '',
    c_password: '',
    path_photo: '',
    phone: '',
    fcm_id: ''
  }

  submitted = false;
  message = '';

  constructor(private helper: ApiHelper, private tokenStorage: TokenStorageService, private profileService: ProfileService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
  }

  onCreateUser(): void {

    if(this.user.name == null || this.user.name == ""){
      this.errorMessage = "name is required"
    }else if(this.user.email == null || this.user.email == ""){
      this.errorMessage = "email is required"
    }else if(this.user.password == null || this.user.password == ""){
      this.errorMessage = "password is required"
    }else if(this.user.c_password == null || this.user.c_password == ""){
      this.errorMessage = "confirm password is required"
    }else {
      if(this.user.password == this.user.c_password){
        const data = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          phone: this.user.phone?.toString(),
          platform: "WEB"
        };
        this.helper.POST("api/user", data, "", "")
          // this.authService.login(email, password)
          .subscribe(
            data => {
              alert("Create User Success")
              this.router.navigateByUrl('login');
            },
            err => {
              this.errorMessage = err.error.error;
            }
          );
      }else{
        this.errorMessage = "password & confirm password does not match"
      }
    }
  }

}
