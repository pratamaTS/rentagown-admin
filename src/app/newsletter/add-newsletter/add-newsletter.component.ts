import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Newsletter } from 'src/app/_models/newsletter.model';
import { NewsletterService } from 'src/app/_services/newsletter.service';
import { Router } from '@angular/router';
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
  data = new FormData()

  newsletter: Newsletter = {
    title: '',
    content: '',
    path_photo: ''
  };

  constructor(private tokenStorage: TokenStorageService, private newsletterService: NewsletterService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getToken())
    this.token = this.tokenStorage.getToken()
  }

  onFileChange(event: any) {

    if(event.target.files && event.target.files.length < 5) {
      const totalPhoto = event.target.files.length

      for (let i = 0; i < totalPhoto; i++) {

        const reader = new FileReader();

        this.data.append("photo_detail", event.target.files[i])

        console.log("photo", event.target.files)

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

  onCreateNewsletter(): void {
    if(this.token != null){
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
      console.log('error', 'Please login first!')
    }
  }

}
