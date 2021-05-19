import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserService } from '../../_services/user.service'
import { ProfileService } from '../../_services/profile.service';
import { User } from '../../_models/user.model'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

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

  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if(this.token != null){
      this.id = this.route.snapshot.params.id
      this.getUserInfo()
    }else{
      console.log('error', 'Please login first!')
    }
  }

  getUserInfo(): void {
    this.userService.getUserByID(this.id, this.tokenType, this.token).subscribe(
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

        this.userService.updateUser(this.id, data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigateByUrl('master-user')
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

        this.userService.updateUser(this.id, data, this.tokenType, this.token)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigateByUrl('master-user')
          },
          error => {
            this.errorMessage = error.error.error;
        });
      }
    }else{
      console.log('error', 'Please login first!')
    }
  }
}
