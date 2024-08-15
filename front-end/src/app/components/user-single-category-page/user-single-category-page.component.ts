import { Component } from '@angular/core';
import { SingleBookCardComponent } from '../users-book-page/single-book-card/single-book-card.component';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-single-category-page',
  standalone: true,
  imports: [SingleBookCardComponent],
  templateUrl: './user-single-category-page.component.html',
  styleUrl: './user-single-category-page.component.css',
})
export class UserSingleCategoryPageComponent {
  currentPage: number = 1;
  booksCount: number = 0;
  moreBooks: boolean = false;
  category: string = '';

  pageSize: number = 6;
  books: Book[] = [];
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(): void {
    this.category = this.route.snapshot.params['category'];
    this.bookService
      .getCategoryBooks(this.currentPage, this.pageSize, this.category)
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
