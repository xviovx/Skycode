import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    if (token) {
      return true;
    }
    return false;
  }
}
