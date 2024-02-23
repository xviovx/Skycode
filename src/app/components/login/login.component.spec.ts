import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// setup tests for LoginComponent
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // setup before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // import necessary modules
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      // declare component
      declarations: [ LoginComponent ]
    }).compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // trigger initial data binding
    fixture.detectChanges();
  });

  // check if component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test form invalidity when empty
  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

// test email field validity
it('email field validity', () => {
  const email = component.loginForm.get('email')!;
  expect(email.valid).toBeFalsy();
  
  email.setValue("test");
  expect(email.valid).toBeFalsy();

  email.setValue("test@example.com");
  expect(email.valid).toBeTruthy();
});

// test password field validity
it('password field validity', () => {
  const password = component.loginForm.get('password')!;
  expect(password.valid).toBeFalsy();

  password.setValue("12345678");
  expect(password.valid).toBeTruthy();
});
});

