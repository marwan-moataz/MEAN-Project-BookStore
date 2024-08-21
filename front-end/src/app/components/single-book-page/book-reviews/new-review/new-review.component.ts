import { Component } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.css',
})
export class NewReviewComponent {
  bookId: any;
  reviewerName = new FormControl('');
  comment = new FormControl('');
  selectedRating: number | null = null;

  onRatingChange(event: any): void {
    this.selectedRating = event.target.value;
  }

  constructor(private service: BookService, private route: ActivatedRoute) {}

  submitBtnHandler = (e: Event) => {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
      this.service
        .insertReview(
          {
            reviewerName: this.reviewerName.value!,
            comment: this.comment.value!,
            rating: this.selectedRating!,
          },
          this.bookId
        )
        .subscribe((data: any) => {
          console.log(data);
        });
    });
    window.location.reload();
  };
}
