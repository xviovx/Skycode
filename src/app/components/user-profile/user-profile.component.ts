import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  userName = 'John Doe'; // Replace with dynamic data
  userUsername = 'john_doe'; // Replace with dynamic data
  userProfileCreationDate = 'Jan 1, 2020'; // Replace with dynamic data
  successfulLoginAttempts: number;
  failedLoginAttempts: number;

  constructor() {
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{"success": 0, "failed": 0}');
    this.successfulLoginAttempts = loginAttempts.success;
    this.failedLoginAttempts = loginAttempts.failed;
  }
}
