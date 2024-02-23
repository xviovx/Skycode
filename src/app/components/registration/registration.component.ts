import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  // Form group representing the registration form
  registrationForm: FormGroup = new FormGroup({
    // Name control with required validation and pattern (only letters and spaces)
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),

    // Email control with required validation and email format validation
    email: new FormControl('', [Validators.required, Validators.email]),

    // Password control with required validation and minimum length of 8 characters
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),

    // Password confirmation control with required validation
    passwordConfirm: new FormControl('', Validators.required)
  });

  // Convenience getters for easy access to form controls from the template
  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get passwordConfirm() { return this.registrationForm.get('passwordConfirm'); }

  onSubmit(): void {
    // Validate the form before submission
    if (this.registrationForm.valid) {
      const passwordControl = this.registrationForm.get('password');
      const passwordConfirmControl = this.registrationForm.get('passwordConfirm');

      // Ensure both password fields are not null (TypeScript strict null checks)
      if (passwordControl && passwordConfirmControl) {
        // Check if password and confirm password values match
        if (passwordControl.value !== passwordConfirmControl.value) {
          // Set error on passwordConfirm control if passwords do not match
          passwordConfirmControl.setErrors({ 'passwordMismatch': true });
        } else {
          // TODO: Implement registration logic here
          // Potential use of a service to handle user registration
        }
      }
    }
  }
}
