import { Component } from '@angular/core';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookReviewsComponent } from './book-reviews/book-reviews.component';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-single-book-page',
  standalone: true,
  imports: [BookDetailsComponent, BookReviewsComponent],
  templateUrl: './single-book-page.component.html',
  styleUrl: './single-book-page.component.css',
})
export class SingleBookPageComponent {
  bookId: string = '';
  bookData!: Book;
  constructor(private service: BookService, private route: ActivatedRoute) {
    this.getBookDetails();
  }
  ngOnInit(): void {}

  getBookDetails = () => {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
      this.service.getSingleBooks(this.bookId).subscribe((data: any) => {
        this.bookData = data.data.book[0];
      });
    });
  };
}
