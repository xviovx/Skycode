import { Component } from '@angular/core';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Skycode';
  showToolbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showToolbar = !(event.url.includes('/register') || event.url.includes('/login'));
    });
  }  

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
