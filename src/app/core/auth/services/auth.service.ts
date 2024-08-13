import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private loggedInStatus = JSON.parse(
    localStorage.getItem('loggedIn') || 'false'
  );

  constructor(private http: HttpClient) {}

  logout() {
    localStorage.clear();
    location.reload();
  }

  login(loginCredentials: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, loginCredentials);
  }

  setLoginStatus(value: any) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  getLoginStatus() {
    return JSON.parse(localStorage.getItem('loggedIn') || 'false');
  }
}
