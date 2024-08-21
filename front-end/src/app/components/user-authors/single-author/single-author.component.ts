import { Component, Input, NgModule } from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../models/author.model';
import { ActivatedRoute } from '@angular/router';
import { books } from './books';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-single-author',
  standalone: true,
  imports: [RatingModule, FormsModule, TreeSelectModule],
  templateUrl: './single-author.component.html',
  styleUrl: './single-author.component.css',
})
export class SingleAuthorComponent {
  // @Input() authorId : any;
  author: Author | undefined;
  auhtorBooks: Book[] = [];

  //for the select
  options: any[] = [
    {
      label: 'Currently Reading',
      value: 'reading',
    },
    {
      label: 'Want to Read',
      value: 'want to read',
    },
    {
      label: 'Read',
      value: 'read',
    },
  ];

  selectedOption: any; //the value of the select

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private bookService: BookService
  ) {}
  ngOnInit(): void {
    this.getAuthor();
  }

  getAuthor() {
    const id = String(this.route.snapshot.paramMap.get('authorId'));
    this.authorService.getSingleAuthor(id).subscribe((data: any) => {
      this.author = data.data.author;
      this.getAuthorBooks();
    });
  }

  getAuthorBooks() {
    this.bookService.getAuthorBooks(this.author!._id).subscribe((data: any) => {
      this.auhtorBooks = data.data.books;
    });
  }
}
