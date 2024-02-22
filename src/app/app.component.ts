import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Skycode';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('userToken');

    this.router.navigate(['/login']);
  }
}
