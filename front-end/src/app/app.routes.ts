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
import { UserAuthorsComponent } from './components/user-authors/user-authors.component';
import { SingleAuthorComponent } from './components/user-authors/single-author/single-author.component';
import { AdminAuthorsComponent } from './components/admin-authors/admin-authors.component';

export const routes: Routes = [
  {
    path: 'admin/books',
    component: AdminBooksPageComponent,
    title: 'Admin Books',
  },
  {
    path: 'admin/categories',
    component: AdminCategoriesPageComponent,
    title: 'Admin Categories',
  },

  { path: 'books', component: UsersBookPageComponent, title: 'Books' },
  {
    path: 'categories',
    component: UserCategoriesPageComponent,
    title: 'Categories',
  },
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
    title: 'User Profile',
  },

  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register Page',
  },
  { path: 'authors', component: UserAuthorsComponent, title: 'Authors' },
  {
    path: 'authors/:authorId',
    component: SingleAuthorComponent,
    title: 'Author Details',
  },
  {
    path: 'admin/authors',
    component: AdminAuthorsComponent,
    title: 'Authors Control Panel',
  },
  { path: '**', component: UserProfileComponent, title: 'Home' },
];
