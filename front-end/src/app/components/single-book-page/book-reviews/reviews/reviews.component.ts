import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  @Input() custReviews: any = [
    { reviewerName: 'Ammar', comment: 'first review', rating: 4 },
    { reviewerName: 'Marwan', comment: 'second review', rating: 3 },
    { reviewerName: 'Ezz', comment: 'third review', rating: 2 },
  ];
}
