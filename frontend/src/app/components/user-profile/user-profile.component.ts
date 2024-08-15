import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserServicesService } from '../../services/user.services.service';
import { NgFor } from '@angular/common';
import { AdminBooksPageComponent } from '../admin-books-page/admin-books-page.component';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { userTableData } from '../../shared/interfaces/userTableData';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    AdminBooksPageComponent,
    AdminTableComponent,
  ],
  selector: 'app-user-books',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserBooksComponent implements OnInit {
  booksForm!: FormGroup;

  currentUser = this.userService.currentUser;
  tableData: any[] = [];
  tableHeader: string[] = [
    'Cover',
    'Name',
    'Author',
    'AvgRate',
    'Rating',
    'Shelve',
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserServicesService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserBooks();
    this.currentUser.book.forEach((book: any) => {
      this.userService
        .getSingleBooks(book.bookId)
        .subscribe((response: any) => {
          this.tableData.push({
            ...response.data.book,
            rating: book.rating,
            shelve: book.shelve,
          });
        });
      console.log(this.tableData);
    });
  }

  initForm() {
    this.booksForm = this.fb.group({
      books: this.fb.array([]),
    });
  }

  get books(): FormArray {
    return this.booksForm.get('books') as FormArray;
  }

  loadUserBooks() {
    this.currentUser.book.forEach(
      (book: {
        bookId: any;
        name: any;
        author: any;
        avgRate: any;
        rating: any;
        shelve: any;
      }) => {
        this.books.push(
          this.fb.group({
            _id: [book.bookId],
            name: [book.name],
            author: [book.author],
            avgRate: [book.avgRate],
            rating: [book.rating],
            shelve: [book.shelve],
          })
        );
      }
    );
    console.log(this.currentUser);
  }
}

// updateBookStatus(index: any, shelves: any) {
//   const selectedBook = this.books.at(index);
//   console.log(index);

//   const bookId = selectedBook.get('_id')?.value;
//   const shelve = shelves;
//   console.log(shelve);

//   this.userService
//     .updateBookStatus(bookId, shelve, userId)
//     .subscribe((response) => {
//       console.log('Book status updated successfully', response);
//     });
// }

// recieveShelveStatus(event: any) {
//   this.updateBookStatus(event.index, event.shelves);
// }
