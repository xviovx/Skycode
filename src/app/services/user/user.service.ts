import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // simulate checking email availability 
  checkEmailAvailability(email: string): Observable<boolean> {
    const isAvailable = email !== 'taken@example.com'; // the assumed taken email
    return of(isAvailable).pipe(delay(1000));
  }

  //simulate submitting reg details
  submitRegistration(details: any): Observable<any> { //type any acceptable for a mock service 
    // mock response with success
    console.log('Registration details:', details);
    return of({ success: true }).pipe(delay(1000)); // simulate async operation with a delay
  }
}
