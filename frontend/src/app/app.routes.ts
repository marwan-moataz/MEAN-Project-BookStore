import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, title: 'login page' },
  { path: 'admin', component: AdminLoginComponent, title: 'admin page' },
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register Page',
  },
];
