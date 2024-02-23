import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
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

      const storedUsers = localStorage.getItem('mockUserDatabase');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.some((user: User) => user.email === email && user.password === password);
      
      if (userExists) {
        localStorage.setItem('userToken', 'mock-token'); 
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    }
  }
}
