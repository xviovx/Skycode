import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    // clear local storage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // pest checking email availability
  it('should return true for available email', (done: DoneFn) => {
    service.checkEmailAvailability('new@example.com').subscribe(isAvailable => {
      expect(isAvailable).toBeTrue();
      done();
    });
  });

  it('should return false for taken email', (done: DoneFn) => {
    // pre-populate mock database with an email
    service['mockUserDatabase'].push({ email: 'taken@example.com' });
    service.checkEmailAvailability('taken@example.com').subscribe(isAvailable => {
      expect(isAvailable).toBeFalse();
      done();
    });
  });

  // test submitting registration details
  it('should register a new user', (done: DoneFn) => {
    const newUser = { email: 'new@example.com', password: 'password123' };
    service.submitRegistration(newUser).subscribe(response => {
      expect(response.success).toBeTrue();
      done();
    });
  });

  // test user login
  it('should login an existing user', (done: DoneFn) => {
    // add a user to mock database
    const existingUser = { email: 'user@example.com', password: 'password' };
    service['mockUserDatabase'].push(existingUser);

    service.loginUser('user@example.com', 'password').subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
      done();
    });
  });

  it('should not login a non-existent user', (done: DoneFn) => {
    service.loginUser('nonexistent@example.com', 'password').subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });
});
