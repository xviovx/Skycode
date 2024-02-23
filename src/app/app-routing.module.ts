import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/authguard/authguard.service';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard] // protect profile route
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] // protect dashboard route
  },
  { path: '', redirectTo: '/register', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
