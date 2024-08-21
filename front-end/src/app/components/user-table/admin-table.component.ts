import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServicesService } from '../../services/user.services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
})
export class AdminTableComponent implements OnInit, OnChanges {
  @Input() tableHeader: string[] = [];
  tableData: any[] = [];
  currentUser: any;

  filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'read', label: 'Read' },
    { value: 'want to read', label: 'Want to Read' },
    { value: 'reading', label: 'Reading' },
  ];

  selectedFilter: string = 'all';
  filteredTableData: any[] = [];
  detailedBookData: any[] = [];

  constructor(private userService: UserServicesService) {}

  ngOnInit() {
    this.loadUserData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      this.fetchBookDetails();
      this.applyFilter();
    }
  }

  loadUserData() {
    const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (response: any) => {
          this.currentUser = response.data.user;

          // Populate table data with user's books
          this.populateTableData();
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  populateTableData() {
    if (this.currentUser && this.currentUser.book) {
      this.tableData = this.currentUser.book.map((book: any) => ({
        ...book,
        // You can add more fields as needed
      }));
    }
    this.fetchBookDetails();
  }

  fetchBookDetails() {
    this.detailedBookData = [];

    this.tableData.forEach((book) => {
      this.userService.getSingleBooks(book.bookId).subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            const detailedBook = {
              ...response.data.book[0],
              shelve: book.shelve,
            };
            this.detailedBookData.push(detailedBook);
            this.filteredTableData = [...this.detailedBookData];
            this.applyFilter();
          }
        },
        error: (error) => {
          console.error('Error fetching book details:', error);
        },
      });
    });
  }

  updateStatusBook(bookId: string, event: any) {
    const newStatus = event.target.value;
    this.userService
      .updateBookStatus(bookId, newStatus, localStorage.getItem('userId')!)
      .subscribe({
        next: (data) => {
          console.log('Status updated:', data);
          this.loadUserData();
        },
        error: (error) => {
          console.error('Error updating book status:', error);
        },
      });
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredTableData = [...this.detailedBookData];
    } else {
      this.filteredTableData = this.detailedBookData.filter(
        (book) => book.shelve === this.selectedFilter
      );
    }
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.target.value;
    this.applyFilter();
  }
}

// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { BooksFormComponent } from '../admin-books-page/book-form/book-form.component';
// import { FormControl, FormsModule } from '@angular/forms';
// import { UserServicesService } from '../../services/user.services.service';

// @Component({
//   selector: 'app-admin-table',
//   standalone: true,
//   imports: [CommonModule, BooksFormComponent, FormsModule],
//   templateUrl: './admin-table.component.html',
//   styleUrl: './admin-table.component.css',
// })
// export class AdminTableComponent {
//   constructor(private userService: UserServicesService) {}
//   @Input() tableHeader: string[] = [];
//   @Input() tableData: any[] = [];
//   modalType: string = '';

//   updateStatusBook(bookId: string, event: any) {
//     this.userService
//       .updateBookStatus(
//         bookId,
//         event.target.value,
//         localStorage.getItem('userId')!
//       )
//       .subscribe((data) => console.log(data));
//     console.log(bookId);
//   }
// }

// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { BooksFormComponent } from '../favorite-books/book-form/book-form.component';
// import { FormControl, FormsModule } from '@angular/forms';
// import { UserServicesService } from '../../services/user.services';

// @Component({
//   selector: 'app-admin-table',
//   standalone: true,
//   imports: [CommonModule, BooksFormComponent, FormsModule],
//   templateUrl: './admin-table.component.html',
//   styleUrls: ['./admin-table.component.css'],
// })
// export class AdminTableComponent {
//   @Input() tableHeader: string[] = [];
//   @Input() tableData: any[] = [];

//   filterOptions = [
//     { value: 'all', label: 'All' },
//     { value: 'read', label: 'Read' },
//     { value: 'want to read', label: 'Want to Read' },
//     { value: 'reading', label: 'Reading' },
//   ];

//   selectedFilter: string = 'all';
//   filteredTableData: any[] = [];

//   constructor(private userService: UserServicesService) {}

//   ngOnInit() {
//     this.filteredTableData = [...this.tableData];
//     this.applyFilter();
//   }

//   updateStatusBook(bookId: string, event: any) {
//     const newStatus = event.target.value;
//     this.userService
//       .updateBookStatus(bookId, newStatus, localStorage.getItem('userId')!)
//       .subscribe((data) => {
//         console.log(data);
//         this.applyFilter();
//       });
//     console.log(bookId);
//   }

//   applyFilter() {
//     if (this.selectedFilter === 'all') {
//       this.filteredTableData = [...this.tableData];
//     } else {
//       this.filteredTableData = this.tableData.filter(
//         (book) => book.shelve === this.selectedFilter
//       );
//     }
//   }

//   onFilterChange(event: any) {
//     this.selectedFilter = event.target.value;
//     this.applyFilter();
//   }
// }
/////////////////////////////////////////////////////////////////////////
// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { UserServicesService } from '../../services/user.services';

// @Component({
//   selector: 'app-admin-table',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './admin-table.component.html',
//   styleUrls: ['./admin-table.component.css'],
// })
// export class AdminTableComponent {
//   @Input() tableHeader: string[] = [];
//   @Input() tableData: any[] = [];
//   detailedBookData: any[] = [];

//   filterOptions = [
//     { value: 'all', label: 'All' },
//     { value: 'read', label: 'Read' },
//     { value: 'want to read', label: 'Want to Read' },
//     { value: 'reading', label: 'Reading' },
//   ];

//   selectedFilter: string = 'all';
//   filteredTableData: any[] = [];

//   constructor(private userService: UserServicesService) {}

//   ngOnInit() {
//     this.reloadBooks();
//     // this.fetchBookDetails();
//     this.applyFilter();
//     this.selectedFilter = 'all';
//   }

//   updateStatusBook(bookId: string, event: any) {
//     const newStatus = event.target.value;
//     this.userService
//       .updateBookStatus(bookId, newStatus, localStorage.getItem('userId')!)
//       .subscribe((data) => {
//         console.log(data);
//         // this.reloadBooks();
//       });
//   }

//   reloadBooks() {
//     this.filteredTableData = this.tableData;
//     this.applyFilter();
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       this.userService.getSingleBooks(userId).subscribe(async (user) => {
//         console.log(user.data.user.book);

//         this.filteredTableData = await user.data.user.book.map((book: any) => ({
//           ...book,
//           shelve: book.shelve,
//         }));
//         console.log(this.tableData);
//       });
//     }
//     this.applyFilter();
//   }

//   applyFilter() {
//     if (this.selectedFilter === 'all') {
//       this.tableData = [...this.tableData];
//     } else {
//       this.tableData = this.tableData.filter(
//         (book) => book.shelve === this.selectedFilter
//       );
//     }
//   }

//   onFilterChange(event: any) {
//     this.selectedFilter = event.target.value;
//     this.applyFilter();
//   }
// }
/////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////

// import { CommonModule } from '@angular/common';
// import {
//   Component,
//   Input,
//   OnInit,
//   OnChanges,
//   SimpleChanges,
// } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { UserServicesService } from '../../services/user.services';

// @Component({
//   selector: 'app-admin-table',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './admin-table.component.html',
//   styleUrls: ['./admin-table.component.css'],
// })
// export class AdminTableComponent implements OnInit, OnChanges {
//   @Input() tableHeader: string[] = [];
//   @Input() tableData: any[] = [];

//   filterOptions = [
//     { value: 'all', label: 'All' },
//     { value: 'read', label: 'Read' },
//     { value: 'want to read', label: 'Want to Read' },
//     { value: 'reading', label: 'Reading' },
//   ];

//   selectedFilter: string = 'all';
//   filteredTableData: any[] = [];

//   constructor(private userService: UserServicesService) {}

//   ngOnInit() {
//     this.reloadBooks();
//   }

//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['tableData']) {
//       this.applyFilter();
//     }
//   }

//   updateStatusBook(bookId: string, event: any) {
//     const newStatus = event.target.value;
//     this.userService
//       .updateBookStatus(bookId, newStatus, localStorage.getItem('userId')!)
//       .subscribe((data) => {
//         console.log(data);
//         this.reloadBooks(); // Reload books after status update
//       });
//   }

//   reloadBooks() {
//     const userId = localStorage.getItem('userId');
//     if (userId) {
//       console.log(userId);

//       this.userService.getUser(userId).subscribe(async (user) => {
//         console.log(user.data.user.book);

//         this.tableData = await user.data.user.book.map((book: any) => ({
//           ...book,
//           shelve: book.shelve,
//         }));
//       });
//     } else {
//       this.tableData = [];
//     }
//     this.applyFilter();
//   }

//   applyFilter() {
//     if (this.selectedFilter === 'all') {
//       this.filteredTableData = [...this.tableData];
//     } else {
//       this.filteredTableData = this.tableData.filter(
//         (book) => book.shelve === this.selectedFilter
//       );
//     }
//   }

//   onFilterChange(event: any) {
//     this.selectedFilter = event.target.value;
//     this.applyFilter();
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////////////////
// import { CommonModule } from '@angular/common';
// import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
// import { BooksFormComponent } from '../favorite-books/book-form/book-form.component';
// import { FormsModule } from '@angular/forms';
// import { UserServicesService } from '../../services/user.services';

// @Component({
//   selector: 'app-admin-table',
//   standalone: true,
//   imports: [CommonModule, BooksFormComponent, FormsModule],
//   templateUrl: './admin-table.component.html',
//   styleUrls: ['./admin-table.component.css'],
// })
// export class AdminTableComponent implements OnChanges {
//   @Input() tableHeader: string[] = [];
//   @Input() tableData: any[] = [];

//   filterOptions = [
//     { value: 'all', label: 'All' },
//     { value: 'read', label: 'Read' },
//     { value: 'want to read', label: 'Want to Read' },
//     { value: 'reading', label: 'Reading' },
//   ];

//   selectedFilter: string = 'all';
//   filteredTableData: any[] = [];

//   constructor(private userService: UserServicesService) {}

//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['tableData']) {
//       this.applyFilter();
//     }
//   }

//   updateStatusBook(bookId: string, event: any) {
//     const newStatus = event.target.value;
//     this.userService
//       .updateBookStatus(bookId, newStatus, localStorage.getItem('userId')!)
//       .subscribe({
//         next: (data) => {
//           this.fetchUpdatedData();
//         },
//         error: (error) => {
//           console.error('Error updating book status:', error);
//         },
//       });
//   }

//   fetchUpdatedData() {
//     // Simulate a delay to ensure the data is fetched and updated
//     setTimeout(() => {
//       this.userService.getBooksByShelve(this.selectedFilter).subscribe({
//         next: (updatedBooks) => {
//           this.tableData = updatedBooks;
//           this.applyFilter();
//         },
//         error: (error) => {
//           console.error('Error fetching updated books:', error);
//         },
//       });
//     }, 500); // Adjust the delay as needed
//   }

//   applyFilter() {
//     if (this.selectedFilter === 'all') {
//       this.filteredTableData = [...this.tableData];
//     } else {
//       this.filteredTableData = this.tableData.filter(
//         (book) => book.shelve === this.selectedFilter
//       );
//     }
//   }

//   onFilterChange(event: any) {
//     this.selectedFilter = event.target.value;
//     this.applyFilter();
//   }
// }
