import { Routes } from '@angular/router';
import { AdminBooksPageComponent } from './components/admin-books-page/admin-books-page.component';
import { UsersBookPageComponent } from './components/users-book-page/users-book-page.component';
import { SingleBookPageComponent } from './components/single-book-page/single-book-page.component';
import { AdminCategoriesPageComponent } from './components/admin-categories-page/admin-categories-page.component';
import { UserCategoriesPageComponent } from './components/user-categories-page/user-categories-page.component';
import { UserSingleCategoryPageComponent } from './components/user-single-category-page/user-single-category-page.component';

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
];
