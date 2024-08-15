import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-book-card',
  standalone: true,
  imports: [],
  templateUrl: './single-book-card.component.html',
  styleUrl: './single-book-card.component.css',
})
export class SingleBookCardComponent {
  @Input() bookId: string = '';
  @Input() title: string = 'The Jungle Book';
  @Input() author: string = 'Rudyard Kipling';
  @Input() photo: string =
    'https://raw.githubusercontent.com/Poojavpatel/BookStoreApp/master/img/jungle.jpg';

  constructor(private router: Router) {}

  showSingleBookPage = () => {
    this.router.navigate(['/books/', this.bookId]);
  };
}
