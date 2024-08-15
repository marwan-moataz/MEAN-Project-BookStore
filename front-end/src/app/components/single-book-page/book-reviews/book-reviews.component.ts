import { Component, Input } from '@angular/core';
import { ReviewsComponent } from './reviews/reviews.component';
import { NewReviewComponent } from './new-review/new-review.component';
import { BookReviews } from '../../../models/book.model';

@Component({
  selector: 'app-book-reviews',
  standalone: true,
  imports: [ReviewsComponent, NewReviewComponent],
  templateUrl: './book-reviews.component.html',
  styleUrl: './book-reviews.component.css',
})
export class BookReviewsComponent {
  @Input() bookRev?: BookReviews[];
  detailsMode: string = 'rev';

  changeDetailsMode(mode: string) {
    this.detailsMode = mode;
  }
}
