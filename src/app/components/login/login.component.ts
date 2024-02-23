import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}

interface LoginAttempts {
  success: number;
  failed: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // get user data and login attempts data from local storage
      const storedUsers = localStorage.getItem('mockUserDatabase');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      const loginAttempts: LoginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{"success": 0, "failed": 0}');

      // check if user exists
      const userExists = users.some((user: User) => user.email === email && user.password === password);

      if (userExists) {
        loginAttempts.success += 1;
        localStorage.setItem('userToken', 'mock-token'); // mock token for simulation
        this.router.navigateByUrl('/dashboard');
      } else {
        loginAttempts.failed += 1;
        alert('Invalid credentials');
      }

      // save login data
      localStorage.setItem('loginAttempts', JSON.stringify(loginAttempts));
    }
  }
}
