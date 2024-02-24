import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from './password-validator';

// user data structure
interface User {
  name: string;
  email: string;
  profileCreationDate: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent { 

  // define form controls and validation rules
  registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', Validators.required)
  }, {validators: passwordMatchValidator });

  constructor(private userService: UserService, private router: Router) {}

  // handle form submission
  onSubmit(): void {
    // check form validity and password match
    if (this.registrationForm.valid && this.registrationForm.get('password')?.value === this.registrationForm.get('passwordConfirm')?.value) {
      // prepare user data for storage
      const user: User = {
        name: this.registrationForm.get('name')?.value,
        email: this.registrationForm.get('email')?.value,
        profileCreationDate: new Date().toISOString(),
      };

      // submit form data and handle response
      this.userService.submitRegistration(this.registrationForm.value).subscribe(response => {
        // store user data and navigate to dashboard
        localStorage.setItem('userToken', response.token); 
        localStorage.setItem('mockUserData', JSON.stringify(user)); 
        this.router.navigateByUrl('/dashboard');
      }, error => {
        console.log('Registration Failed', error);
      });
    } else {
      // more specific error handling could be added here if necessary
    }
  }

  // check email availability
  checkEmailAvailability(): void {
    const emailControl = this.registrationForm.get('email');
    if (emailControl && emailControl.valid) {
      // validate email and update form status
      this.userService.checkEmailAvailability(emailControl.value).subscribe(isAvailable => {
        if (!isAvailable) {
          emailControl.setErrors({ 'emailTaken': true });
        }
      });
    }
  }  
}
