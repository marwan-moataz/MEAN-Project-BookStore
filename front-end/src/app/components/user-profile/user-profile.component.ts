// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   FormArray,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { UserServicesService } from '../../services/user.services';
// import { NgFor } from '@angular/common';
// import { AdminBooksPageComponent } from '../admin-books-page/admin-books-page.component';
// import { AdminTableComponent } from '../user-table/admin-table.component';

// @Component({
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     NgFor,
//     AdminBooksPageComponent,
//     AdminTableComponent,
//   ],
//   selector: 'app-user-books',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css'],
// })
// export class UserProfileComponent implements OnInit {
//   booksForm!: FormGroup;
//   currentUser: any;
//   tableData: any[] = [];
//   tableHeader: string[] = [
//     'Cover',
//     'Name',
//     'Author',
//     'AvgRate',
//     'Rating',
//     'Shelve',
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private userService: UserServicesService
//   ) {}

//   ngOnInit(): void {
//     this.currentUser = this.userService.currentUser;
//     this.initForm();
//     this.loadUserBooks();
//     this.currentUser.book.forEach((book: any) => {
//       this.userService
//         .getSingleBooks(book.bookId)
//         .subscribe((response: any) => {
//           this.tableData.push({
//             ...response.data.book[0],
//             rating: book.rating,
//             shelve: book.shelve,
//           });
//           console.log(this.tableData);
//         });
//     });
//   }

//   initForm() {
//     this.booksForm = this.fb.group({
//       books: this.fb.array([]),
//     });
//   }

//   get books(): FormArray {
//     return this.booksForm.get('books') as FormArray;
//   }

//   loadUserBooks() {
//     this.currentUser.book.forEach(
//       (book: {
//         bookId: any;
//         name: any;
//         author: any;
//         avgRate: any;
//         rating: any;
//         shelve: any;
//       }) => {
//         this.books.push(
//           this.fb.group({
//             _id: [book.bookId],
//             name: [book.name],
//             author: [book.author],
//             avgRate: [book.avgRate],
//             rating: [book.rating],
//             shelve: [book.shelve],
//           })
//         );
//       }
//     );
//     console.log(this.currentUser);
//   }
// }
////////////////////////////////////////////////////////////////
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserServicesService } from '../../services/user.services';
import { NgFor } from '@angular/common';
import { AdminBooksPageComponent } from '../admin-books-page/admin-books-page.component';
import { AdminTableComponent } from '../user-table/admin-table.component';

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
export class UserProfileComponent implements OnInit {
  booksForm!: FormGroup;
  currentUser: any;
  tableData: any[] = [];
  tableHeader: string[] = ['#', 'Cover', 'Name', 'Author', 'AvgRate', 'Shelve'];

  constructor(
    private fb: FormBuilder,
    private userService: UserServicesService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.booksForm = this.fb.group({
      books: this.fb.array([]),
    });
  }

  get books(): FormArray {
    return this.booksForm.get('books') as FormArray;
  }

  // populateTableData() {
  //   this.currentUser.book.forEach((book: any) => {
  //     this.userService
  //       .getSingleBooks(book.bookId)
  //       .subscribe((response: any) => {
  //         this.tableData.push({
  //           ...response.data.book[0],
  //           rating: book.rating,
  //           shelve: book.shelve,
  //         });
  //         console.log(this.tableData);
  //       });
  //   });
  // }
}

///////////////////////////////////////////////////////////////

// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   FormArray,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { UserServicesService } from '../../services/user.services';
// import { NgFor } from '@angular/common';
// import { AdminBooksPageComponent } from '../admin-books-page/admin-books-page.component';
// import { AdminTableComponent } from '../user-table/admin-table.component';

// @Component({
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     NgFor,
//     AdminBooksPageComponent,
//     AdminTableComponent,
//   ],
//   selector: 'app-user-books',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css'],
// })
// export class UserBooksComponent implements OnInit {
//   booksForm!: FormGroup;
//   currentUser: any;
//   tableData: any[] = [];
//   tableHeader: string[] = [
//     'Cover',
//     'Name',
//     'Author',
//     'AvgRate',
//     'Rating',
//     'Shelve',
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private userService: UserServicesService
//   ) {}

//   ngOnInit(): void {
//     this.currentUser = this.userService.currentUser;
//     this.initForm();
//     this.loadUserBooks();
//   }

//   initForm() {
//     this.booksForm = this.fb.group({
//       books: this.fb.array([]),
//     });
//   }

//   get books(): FormArray {
//     return this.booksForm.get('books') as FormArray;
//   }

//   loadUserBooks() {
//     // Clear previous data
//     this.tableData = [];
//     this.books.clear();

//     // Fetch books data from the user's book collection
//     this.currentUser.book.forEach((book: any) => {
//       this.userService
//         .getSingleBooks(book.bookId)
//         .subscribe((response: any) => {
//           const bookData = {
//             ...response.data.book[0],
//             rating: book.rating,
//             shelve: book.shelve,
//           };
//           this.tableData.push(bookData);

//           // Add book to the FormArray
//           this.books.push(
//             this.fb.group({
//               _id: [bookData._id],
//               name: [bookData.name],
//               author: [bookData.author],
//               avgRate: [bookData.avgRate],
//               rating: [bookData.rating],
//               shelve: [bookData.shelve],
//             })
//           );
//         });
//     });
//   }

//   onStatusChange() {
//     this.loadUserBooks();
//   }
// }

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
