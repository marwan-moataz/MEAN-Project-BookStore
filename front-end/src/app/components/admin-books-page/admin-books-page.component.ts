import { Component } from '@angular/core';
import { BooksFormComponent } from './books-form/books-form.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { AdminTableComponent } from '../../shared/admin-table/admin-table.component';
import { TableData } from '../../models/tableData.model';

@Component({
  selector: 'app-admin-books-page',
  standalone: true,
  imports: [
    BooksFormComponent,
    CommonModule,
    PaginationComponent,
    AdminTableComponent,
  ],
  templateUrl: './admin-books-page.component.html',
  styleUrl: './admin-books-page.component.css',
})
export class AdminBooksPageComponent {
  modalType = 'Add';
  currentPage = 1;
  pageSize = 5;
  booksCount: number = 0;
  moreBooks: boolean = false;

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
    this.getBooks();
  }
  getBooks(action?: 'nxt' | 'prev'): void {
    if (action === 'nxt') {
      this.currentPage++;
    } else if (action === 'prev') {
      this.currentPage--;
    }
    this.bookService
      .getBooks(this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.books = data.data.books;
        this.booksCount = data.data.booksCount;
      });
    this.moreBooks =
      this.pageSize * (this.currentPage - 1) + this.books.length <=
      this.booksCount;
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
