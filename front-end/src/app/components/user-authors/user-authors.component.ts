import { Component } from '@angular/core';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { RouterLink } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-user-authors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-authors.component.html',
  styleUrl: './user-authors.component.css'
})
export class UserAuthorsComponent {
  authors:Author[] = [];

  constructor(private authorService:AuthorService){}

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(){
    this.authorService.getAuthors().subscribe((data:any) => {
      this.authors = data.data.authors;
      // this.authorsCount = data.data.authorsCount;
    })
  }

}
