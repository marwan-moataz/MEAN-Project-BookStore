// import { Component } from '@angular/core';
// import { Author } from '../../models/author.model';
// import { AuthorService } from '../../services/author.service';

// @Component({
//   selector: 'app-admin-authors',
//   standalone: true,
//   imports: [],
//   templateUrl: './admin-authors.component.html',
//   styleUrl: './admin-authors.component.css'
// })
// export class AdminAuthorsComponent {
//   authors:Author[] = [];

//   constructor(private authorService:AuthorService){}

//   ngOnInit(): void {
//     this.getAuthors();
//   }

//   getAuthors(){
//     this.authorService.getAuthors().subscribe((data:any) => {
//       this.authors = data.data.authors;
//     })
//   }

//   deleteAuthor(authorId:string) : void{
//     this.authorService.deleteAuthor(authorId).subscribe(()=>{
//       this.authors = this.authors.filter(author => author._id != authorId)
//     })
//   }
// }


import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorDialogComponent } from './author-dialog/author-dialog.component'; // Adjust path as needed
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { AdminNavigationComponent } from "../../shared/admin-navigation/admin-navigation.component";

@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AdminNavigationComponent
],
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.css']
})
export class AdminAuthorsComponent {
  authors: Author[] = [];

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((data: any) => {
      this.authors = data.data.authors;
    });
  }

  openDialog(author?: Author): void {
    const dialogRef = this.dialog.open(AuthorDialogComponent, {
      data: author || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (author) {
          // Update existing author
          this.authorService.updateAuthor(author._id, result).subscribe(() => {
            this.getAuthors(); // Refresh authors list
          });
        } else {
          // Create new author
          this.authorService.createAuthor(result).subscribe(() => {
            this.getAuthors(); // Refresh authors list
          });
        }
      }
    });
  }

  deleteAuthor(authorId: string): void {
    this.authorService.deleteAuthor(authorId).subscribe(() => {
      this.authors = this.authors.filter(author => author._id !== authorId);
    });
  }
}
