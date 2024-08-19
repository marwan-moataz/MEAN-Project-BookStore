import { Component, Input , NgModule} from '@angular/core';
import { AuthorService } from '../../../services/author.service';
import { Author } from '../../../models/author.model';
import { ActivatedRoute } from '@angular/router';
import { books } from './books';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';


@Component({
  selector: 'app-single-author',
  standalone: true,
  imports: [RatingModule,FormsModule,TreeSelectModule],
  templateUrl: './single-author.component.html',
  styleUrl: './single-author.component.css'
})
export class SingleAuthorComponent {
  // @Input() authorId : any;
  author: Author | undefined;
  auhtorBooks = books;

  //for the select
  options: any[] = [
    {
      label: 'Currently Reading',
      value: 'currently_reading'
    },
    {
      label: 'Want to Read',
      value: 'want_to_read'
    },
    {
      label: 'Read',
      value: 'read'
    }
  ];

  selectedOption: any;   //the value of the select

  constructor(private route:ActivatedRoute, private authorService:AuthorService){
  }
  ngOnInit(): void {
    this.getAuthor();
    // this.auhtorBooks = books;
  }

  getAuthor(){
    const id =String(this.route.snapshot.paramMap.get('authorId'));
    this.authorService.getSingleAuthor(id).subscribe((data:any) => {
      this.author = data.data.author;
    })
  }

}
