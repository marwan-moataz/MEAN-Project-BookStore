import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminTableComponent } from './components/user-table/admin-table.component';
import { UserBooksComponent } from './components/user-profile/user-profile.component';
import { FavoriteBooksComponent } from './components/favorite-books/favorite-books.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, title: 'login page' },
  { path: 'admin', component: AdminLoginComponent, title: 'admin page' },
  { path: 'adminTable', component: AdminTableComponent, title: 'admin table' },
  { path: 'userProfile', component: UserBooksComponent, title: 'user profile' },
  {
    path: 'favoriteBooks',
    component: FavoriteBooksComponent,
    title: 'user profile',
  },

  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register Page',
  },
];
