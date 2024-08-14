import { Routes } from '@angular/router';
import { AdminBooksPageComponent } from './components/admin-books-page/admin-books-page.component';
import { UsersBookPageComponent } from './components/users-book-page/users-book-page.component';
import { SingleBookPageComponent } from './components/single-book-page/single-book-page.component';

export const routes: Routes = [
  { path: 'admin/books', component: AdminBooksPageComponent },
  { path: 'books', component: UsersBookPageComponent },
  {
    path: 'books/:id',
    component: SingleBookPageComponent,
  },
];
