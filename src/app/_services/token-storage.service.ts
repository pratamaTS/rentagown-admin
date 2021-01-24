import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(refreshToken: any): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN);
    window.sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER);
    window.sessionStorage.setItem(USER, user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER);
    if (user) {
      console.log('user session', user)
      return JSON.stringify(user);
    }

    return {};
  }
}
