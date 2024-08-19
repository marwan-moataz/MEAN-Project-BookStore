import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserServicesService } from '../../../services/user.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent {
  constructor(private userService: UserServicesService) {}
  @Input() bookData: Book = {
    photo:
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F07%2Fchances-are-1-2000.jpg&q=85',
    name: 'Changes Are',
    category: 'Adventure',
    author: 'Richard Russo',
    averageRating: 4,
  };
  @Input() bookId: string = '';

  isLoggedIn = localStorage.getItem('User');
  bookStatus = new FormControl<string | null>(null);

  onBookStatusChanged() {
    const userID = JSON.parse(localStorage.getItem('User')!).userId;
    this.userService
      .updateBookStatus(this.bookData._id!, this.bookStatus.value!, userID)
      .subscribe((response) => console.log('Book status updated:', response));
  }
}
