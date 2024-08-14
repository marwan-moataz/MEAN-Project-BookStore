import { Component } from '@angular/core';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookReviewsComponent } from './book-reviews/book-reviews.component';

@Component({
  selector: 'app-single-book-page',
  standalone: true,
  imports: [BookDetailsComponent, BookReviewsComponent],
  templateUrl: './single-book-page.component.html',
  styleUrl: './single-book-page.component.css',
})
export class SingleBookPageComponent {}
