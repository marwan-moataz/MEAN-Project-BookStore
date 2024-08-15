import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminBooksPageComponent } from './components/admin-books-page/admin-books-page.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { UserBooksComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, title: 'login page' },
  { path: 'admin', component: AdminLoginComponent, title: 'admin page' },
  { path: 'adminTable', component: AdminTableComponent, title: 'admin table' },
  { path: 'userProfile', component: UserBooksComponent, title: 'user profile' },
  {
    path: 'adminBooks/books',
    component: AdminBooksPageComponent,
    title: 'adminBooks',
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register Page',
  },
];
