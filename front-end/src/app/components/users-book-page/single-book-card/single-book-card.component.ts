import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-book-card',
  standalone: true,
  imports: [],
  templateUrl: './single-book-card.component.html',
  styleUrl: './single-book-card.component.css',
})
export class SingleBookCardComponent {
  @Input() title: string = 'The Jungle Book';
  @Input() author: string = 'Rudyard Kipling';
  @Input() photo: string =
    'https://raw.githubusercontent.com/Poojavpatel/BookStoreApp/master/img/jungle.jpg';
}
