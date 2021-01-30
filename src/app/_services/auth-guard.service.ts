import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: Auth, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
