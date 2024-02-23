import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

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

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (this.registrationForm.valid && this.registrationForm.get('password')?.value === this.registrationForm.get('passwordConfirm')?.value) {
      const user: User = {
        name: this.registrationForm.get('name')?.value,
        email: this.registrationForm.get('email')?.value,
        profileCreationDate: new Date().toISOString(),
      };

      this.userService.submitRegistration(this.registrationForm.value).subscribe(response => {
        console.log('Registration Successful', response);
        localStorage.setItem('userToken', response.token); 
        localStorage.setItem('mockUserData', JSON.stringify(user)); 
        this.router.navigateByUrl('/dashboard');
      }, error => {
        console.log('Registration Failed', error);
      });
    } else {
      if (this.registrationForm.get('password')?.value !== this.registrationForm.get('passwordConfirm')?.value) {
        this.registrationForm.get('passwordConfirm')?.setErrors({ 'passwordMismatch': true });
      }
    }
  }

  checkEmailAvailability(): void {
    const emailControl = this.registrationForm.get('email');
    if (emailControl && emailControl.valid) {
      this.userService.checkEmailAvailability(emailControl.value).subscribe(isAvailable => {
        if (!isAvailable) {
          emailControl.setErrors({ 'emailTaken': true });
        }
      });
    }
  }  
}
