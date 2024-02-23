import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  // check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    // return true if token exists, else false
    return !!token;
  }
}
