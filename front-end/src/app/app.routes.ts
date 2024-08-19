import { Routes } from '@angular/router';
import { AdminBooksPageComponent } from './components/admin-books-page/admin-books-page.component';
import { UsersBookPageComponent } from './components/users-book-page/users-book-page.component';
import { SingleBookPageComponent } from './components/single-book-page/single-book-page.component';
import { AdminCategoriesPageComponent } from './components/admin-categories-page/admin-categories-page.component';
import { UserCategoriesPageComponent } from './components/user-categories-page/user-categories-page.component';
import { UserSingleCategoryPageComponent } from './components/user-single-category-page/user-single-category-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminTableComponent } from './components/user-table/admin-table.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FavoriteBooksComponent } from './components/favorite-books/favorite-books.component';

export const routes: Routes = [
  { path: 'admin/books', component: AdminBooksPageComponent },
  { path: 'admin/categories', component: AdminCategoriesPageComponent },

  { path: 'books', component: UsersBookPageComponent },
  { path: 'categories', component: UserCategoriesPageComponent },
  {
    path: 'categories/:category',
    component: UserSingleCategoryPageComponent,
  },
  {
    path: 'books/:id',
    component: SingleBookPageComponent,
  },
  { path: 'login', component: LoginPageComponent, title: 'login page' },
  { path: 'admin', component: AdminLoginComponent, title: 'admin page' },
  { path: 'adminTable', component: AdminTableComponent, title: 'admin table' },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    title: 'user profile',
  },
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
