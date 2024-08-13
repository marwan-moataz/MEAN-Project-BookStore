import { Component } from '@angular/core';
import { BooksFormComponent } from './books-form/books-form.component';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-books-page',
  standalone: true,
  imports: [BooksFormComponent, CommonModule],
  templateUrl: './admin-books-page.component.html',
  styleUrl: './admin-books-page.component.css',
})
export class AdminBooksPageComponent {
  modalType = 'Add';
  currentPage = 1;
  pageSize = 5;
  books: Book[] = [];
  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(): void {
    this.bookService
      .getBooks(this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.books = data.data.books;
      });
  }
}
