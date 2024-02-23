import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //mock user data storage - for demonstrative purposes only
  private mockUserDatabase: any[] = [];

  constructor() {
    const storedUsers = localStorage.getItem('mockUserDatabase');
    this.mockUserDatabase = storedUsers ? JSON.parse(storedUsers) : [];
   }

  // simulate checking email availability 
  checkEmailAvailability(email: string): Observable<boolean> {
    const isAvailable = !this.mockUserDatabase.some(user => user.email === email);
    console.log(`Checking availability for email: ${email}. Is available: ${isAvailable}`);
    return of(isAvailable).pipe(delay(1000));
  }

  //simulate submitting reg details
  submitRegistration(details: any): Observable<any> {
    this.mockUserDatabase.push(details);
    // save updated array to local storage
    localStorage.setItem('mockUserDatabase', JSON.stringify(this.mockUserDatabase));
    console.log('Registration details:', details);
    return of({ success: true }).pipe(delay(1000));
  }

  // simulate a user login
  loginUser(email: string, password: string): Observable<boolean> {
    const userExists = this.mockUserDatabase.some(user => user.email === email && user.password === password);
    return of(userExists).pipe(delay(1000)); // simulate another async operation with a delay
  }
}
