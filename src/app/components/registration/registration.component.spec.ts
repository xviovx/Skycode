import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    // setup TestBed
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [ RegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test form invalid when empty
  it('form should be invalid when empty', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });

  // test email field validity
  it('email field validity', () => {
    const email = component.registrationForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue("test");
    expect(email.valid).toBeFalsy();

    email.setValue("test@example.com");
    expect(email.valid).toBeTruthy();
  });

  // test name field validity
  it('name field validity', () => {
    const name = component.registrationForm.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue("123");
    expect(name.valid).toBeFalsy();

    name.setValue("John Doe");
    expect(name.valid).toBeTruthy();
  });

  // test password field validity
  it('password field validity', () => {
    const password = component.registrationForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue("123");
    expect(password.valid).toBeFalsy();

    password.setValue("12345678");
    expect(password.valid).toBeTruthy();
  });

  // test password confirmation field
  it('passwordConfirm field validity', () => {
    const password = component.registrationForm.controls['password'];
    const passwordConfirm = component.registrationForm.controls['passwordConfirm'];

    password.setValue("12345678");
    passwordConfirm.setValue("12345678");
    expect(passwordConfirm.valid).toBeTruthy();
  });
});
