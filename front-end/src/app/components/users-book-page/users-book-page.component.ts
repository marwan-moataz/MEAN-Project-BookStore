import { Component } from '@angular/core';
import { SingleBookCardComponent } from './single-book-card/single-book-card.component';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-book-page',
  standalone: true,
  imports: [SingleBookCardComponent, CommonModule, PaginationComponent],
  templateUrl: './users-book-page.component.html',
  styleUrl: './users-book-page.component.css',
})
export class UsersBookPageComponent {
  currentPage: number = 1;
  booksCount: number = 0;
  moreBooks: boolean = false;

  pageSize: number = 6;
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
