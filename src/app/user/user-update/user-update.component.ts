import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service'
import { ProfileService } from '../../_services/profile.service';
import { User } from '../../_models/user.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

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

  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(this.token != null){
      this.getProfile()
    }else{
      console.log('error', 'Please login first!')
    }
  }

  getProfile(): void {
    this.profileService.getProfile(this.tokenType, this.token).subscribe(
      data => {
        this.dataUser = data.data
        this.user.name = this.dataUser.name
        this.user.email = this.dataUser.email
        this.user.phone = this.dataUser.phone
        this.user.path_photo = this.dataUser.path_photo
        console.log('user', this.user)
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

  onFileChange(event: any) {

    if(event.target.files && event.target.files.length < 5) {
      const totalPhoto = event.target.files.length

      for (let i = 0; i < totalPhoto; i++) {

        const reader = new FileReader();

        this.data.append("avatar", event.target.files[i])

        console.log("photo", event.target.files)

        reader.onload = (event:any) => {
          this.imageSrc.push(event.target.result)
        };

        reader.readAsDataURL(event.target.files[i])
        this.upload = true
      }
    }else{
      this.errorMessage = "Max. upload image 1"
    }
  }

  uploadPhoto(): void {
    if(this.upload == true){
      this.userService.uploadPhotoProfile(this.data, this.tokenType, this.token)
      .subscribe(
        data => {
          console.log(data);
          this.dataUploadPhoto = data.data
          console.log("path_foto",this.dataUploadPhoto)
          this.onUpdateProfile()
        },
        error => {
          console.log(error);
        });
    }else{
      this.onUpdateProfile()
    }
  }

  onUpdateProfile(): void {
    if(this.token != null){
      if(this.upload == true){
        const data = {
          name: this.user.name,
          email: this.user.email,
          path_photo: this.dataUploadPhoto[0].path_photo,
          phone: this.user.phone?.toString()
        };


        this.userService.updateUserProfile(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            if(this.user.password!=null){
              this.onUpdatePassword()
            }else{
              this.router.navigateByUrl('master-user')
            }
          },
          error => {
            this.errorMessage = error.error.error;
        });

      }else{
        const data = {
          name: this.user.name,
          email: this.user.email,
          path_photo: this.dataUser.path_photo,
          phone: this.user.phone?.toString()
        };


        this.userService.updateUserProfile(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            if(this.user.password!=null){
              this.onUpdatePassword()
            }else{
              this.router.navigateByUrl('master-user')
            }
          },
          error => {
            this.errorMessage = error.error.error;
        });
      }
    }else{
      console.log('error', 'Please login first!')
    }
  }

  onUpdatePassword(): void {
    if(this.user.password == this.user.c_password){
      const data = {
        password: this.user.password
      };

      this.userService.updateUserPass(data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message;
            this.router.navigateByUrl('master-user');
          },
          error => {
            console.log(error);
      });
    }else{
      this.errorMessage = "Wrong password, please confirm password again"
    }
  }
}
