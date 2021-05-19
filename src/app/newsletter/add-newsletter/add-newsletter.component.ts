import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Newsletter } from 'src/app/_models/newsletter.model';
import { Email } from 'src/app/_models/email.model';
import { NewsletterService } from 'src/app/_services/newsletter.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
@Component({
  selector: 'app-add-newsletter',
  templateUrl: './add-newsletter.component.html',
  styleUrls: ['./add-newsletter.component.css']
})
export class AddNewsletterComponent implements OnInit {

  tokenType: String = 'Bearer'
  token: String | null = ''
  errorMessage = ''
  imageSrc: any = []
  dataUploadPhoto: any = []
  dataUser: any = []
  dataEmail: any = []
  data = new FormData()
  allUser = false

  newsletter: Newsletter = {
    title: '',
    content: '',
    path_photo: ''
  };

  email = []
  emailSelected = false
  submitted = false

  constructor(private ng2ImgMax: Ng2ImgMaxService, private tokenStorage: TokenStorageService, private newsletterService: NewsletterService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
    this.getAllUser();
  }

  selectedEmail(event: any): void {
    const valueUserEmail = JSON.parse(event.target.value)
    this.emailSelected = true
    if(valueUserEmail.email != "alluser"){
      this.dataEmail.push(valueUserEmail.email)
      this.allUser = false
      console.log("email", this.dataEmail)
    }else{
      this.allUser = true
      console.log("alluser", true)
    }
  }

  getAllUser(): void {
    this.userService.getAllUser(this.tokenType, this.token).subscribe(
      data => {
        this.dataUser = data.data
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

        this.ng2ImgMax.resizeImage(event.target.files[i], 800, 600).subscribe(
          result => {
            this.data.append("photo_detail", result)
            this.submitted = true
            console.log("result resize", result)
          },
          error => {
            console.log('Failed to resize image!', error);
          }
        );

        reader.onload = (event:any) => {
          this.imageSrc.push(event.target.result)
        };

        reader.readAsDataURL(event.target.files[i])
      }
    }else{
      this.errorMessage = "Max. upload image 1"
    }
  }

  uploadPhoto(): void {
    if(this.submitted == false){
      this.errorMessage = "Newsletter image is required"
    }else if(this.newsletter.title == null || this.newsletter.title == ""){
      this.errorMessage = "Newsletter title is required"
    }else if(this.newsletter.content == null || this.newsletter.content == ""){
      this.errorMessage = "Newsletter content is required"
    }else if(this.emailSelected == false){
      this.errorMessage = "User email is required"
    }else{
      this.newsletterService.uploadPhotoNewsletter(this.data, this.tokenType, this.token)
      .subscribe(
        data => {
          console.log(data);
          this.dataUploadPhoto = data.data
          console.log("path_foto",this.dataUploadPhoto)
          this.onCreateNewsletter()
        },
        error => {
          console.log(error);
        });
    }
  }

  onCreateNewsletter(): void {
    if(this.token != null){

      if(this.allUser == true){

        const data = {
          title: this.newsletter.title,
          content: this.newsletter.content,
          path_photo: this.dataUploadPhoto[0].path_photo
        };
        this.newsletterService.createNewsletterAllUser(data, this.tokenType, this.token)
          .subscribe(
            response => {
              console.log(response);
              this.router.navigateByUrl('master-newsletter')
            },
            error => {
              this.errorMessage = error.error.error;
        });

      }else{
        const data = {
          title: this.newsletter.title,
          content: this.newsletter.content,
          path_photo: this.dataUploadPhoto[0].path_photo,
          emails: this.dataEmail
        };
        this.newsletterService.createNewsletterSelectedUser(data, this.tokenType, this.token)
          .subscribe(
            response => {
              console.log(response);
              this.router.navigateByUrl('master-newsletter')
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
