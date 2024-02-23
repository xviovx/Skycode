import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // inject router and auth service
  constructor(private router: Router, private authService: AuthenticationService) {} 

  // guard to check if user can activate a route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // allow route access if authenticated
    if (this.authService.isAuthenticated()) {
      return true;
    }
    // redirect to register if not authenticated
    return this.router.parseUrl('/register'); 
  }
}
