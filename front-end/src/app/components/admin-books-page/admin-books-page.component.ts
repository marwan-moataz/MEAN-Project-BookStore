import { Component } from '@angular/core';
import { BooksFormComponent } from './books-form/books-form.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { AdminTableComponent } from '../../shared/admin-table/admin-table.component';
import { TableData } from '../../models/tableData.model';
import { BookDetailsComponent } from '../single-book-page/book-details/book-details.component';
import { AdminNavigationComponent } from '../../shared/admin-navigation/admin-navigation.component';

@Component({
  selector: 'app-admin-books-page',
  standalone: true,
  imports: [
    BooksFormComponent,
    CommonModule,
    PaginationComponent,
    AdminTableComponent,
    BookDetailsComponent,
    AdminNavigationComponent,
  ],
  templateUrl: './admin-books-page.component.html',
  styleUrl: './admin-books-page.component.css',
})
export class AdminBooksPageComponent {
  modalType = 'Add';
  currentPage = 1;
  pageSize = 5;
  booksCount: number = 0;
  moreBooks!: boolean;

  books: Book[] | TableData[] = [];
  tableHeader: string[] = [
    '#',
    'Photo',
    'Title',
    'Category',
    'Author',
    'Actions',
  ];
  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    const userToken = JSON.parse(localStorage.getItem('User')!);
    if (!userToken || !userToken.isAdmin) {
      alert('Please login to access this page');
      window.location.href = '/admin';
      return;
    } else this.getBooks();
  }

  getBooks(): void {
    this.bookService
      .getBooks(this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.books = data.data.books;
        this.booksCount == 0 ? (this.booksCount = data.data.booksCount) : '';
      });
    this.moreBooks =
      this.pageSize * (this.currentPage - 1) + this.books.length <=
      this.booksCount + 1;
  }

  nextBtnOnclick = () => {
    this.currentPage++;
    this.getBooks();
  };

  previousBtnOnclick = () => {
    this.currentPage--;
    this.getBooks();
  };
}
