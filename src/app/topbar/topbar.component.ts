import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  name: String = ''
  email: String = ''
  tokenType: String = 'Bearer'
  token: String | null = ''
  user: any;
  profile: any
  errorMessage = ''

  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken()
      if(this.token != null){
        this.profileService.getProfile(this.tokenType, this.token).subscribe(
          data => {
            this.user = data.data
            this.name = this.user.name
            console.log('user', this.user)
            this.tokenStorage.saveUser(this.user)
          },
          err => {
            this.errorMessage = err.error.message;
          }
        )
      }else{
        console.log('error', 'Please login first!')
      }
  }

}
