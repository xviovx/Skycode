import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './authguard.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// setting up tests for AuthGuard
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthenticationService;
  let router: Router;

  // setup before each test
  beforeEach(() => {
    // configuring testing module
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        // mock auth service
        { provide: AuthenticationService, useValue: { isAuthenticated: () => false } }
      ]
    });
    // inject dependencies
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  // test guard creation
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // test redirect for unauthenticated user
  it('should redirect unauthenticated user to register', () => {
    // mock isAuthenticated to return false and spy on router
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'parseUrl');
  
    // mock route and state
    const route = new ActivatedRouteSnapshot();
    const state = { url: '/somepath' } as RouterStateSnapshot;
  
    // expect guard to redirect to register
    expect(guard.canActivate(route, state)).toEqual(router.parseUrl('/register'));
    // check parseUrl called with '/register'
    expect(router.parseUrl).toHaveBeenCalledWith('/register');
  });
  
  // test access for authenticated user
  it('should allow authenticated user access', () => {
    // mock isAuthenticated to return true
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
  
    // mock route and state
    const route = new ActivatedRouteSnapshot();
    const state = { url: '/somepath' } as RouterStateSnapshot;
  
    // expect guard to allow access
    expect(guard.canActivate(route, state)).toEqual(true);
  });
});
