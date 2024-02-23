import { Component, OnInit } from '@angular/core';

// define structure for login attempts
interface LoginAttempts {
  success: number;
  failed: number;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // init user data properties
  userName: string = ''; 
  userUsername: string = ''; 
  userProfileCreationDate: string = ''; 
  successfulLoginAttempts: number = 0;
  failedLoginAttempts: number = 0;

  ngOnInit(): void {
    // fetch data on init
    this.fetchUserData();
    this.fetchLoginAttempts();
  }

  // fetch user data from local storage
  private fetchUserData(): void {
    const userDataString = localStorage.getItem('mockUserData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.userName = userData.name;
      this.userUsername = userData.email;
      
      // format creation date to 'YYYY-MM-DD'
      const creationDate = new Date(userData.profileCreationDate);
      this.userProfileCreationDate = creationDate.toISOString().split('T')[0];
    }
  }

  // fetch login attempts from local storage
  private fetchLoginAttempts(): void {
    const loginAttemptsString = localStorage.getItem('loginAttempts');
    const loginAttempts: LoginAttempts = loginAttemptsString ? JSON.parse(loginAttemptsString) : { success: 0, failed: 0 };
    this.successfulLoginAttempts = loginAttempts.success;
    this.failedLoginAttempts = loginAttempts.failed;
  }
}
