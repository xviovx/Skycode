import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  // form group for registration form
  registrationForm: FormGroup = new FormGroup({
    // name control with required validation and pattern (only letters and spaces)
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),

    // email control with required validation and email format validation
    email: new FormControl('', [Validators.required, Validators.email]),

    // password control with required validation and minimum length of 8 characters
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),

    // password confirmation control with required validation
    passwordConfirm: new FormControl('', Validators.required)
  });

  // convenience getters for easy access to form controls from the template
  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get passwordConfirm() { return this.registrationForm.get('passwordConfirm'); }

  constructor(private userService: UserService) {}

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const passwordControl = this.registrationForm.get('password');
      const passwordConfirmControl = this.registrationForm.get('passwordConfirm');

      if (passwordControl && passwordConfirmControl) {
        if (passwordControl.value !== passwordConfirmControl.value) {
          passwordConfirmControl.setErrors({ 'passwordMismatch': true });
          return;
        }

        // Call the UserService to submit registration details
        this.userService.submitRegistration(this.registrationForm.value).subscribe(response => {
          // Handle successful registration
          console.log('Registration Successful', response);
          // You can navigate to a different page or show a success message
        }, error => {
          // Handle error scenario
          console.log('Registration Failed', error);
          // Show an error message to the user
        });
      }
    }
  }

  // method to check email availability
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
