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

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooksFormComponent } from '../favorite-books/book-form/book-form.component';
import { FormControl, FormsModule } from '@angular/forms';
import { UserServicesService } from '../../services/user.services';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, BooksFormComponent, FormsModule],
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css'],
})
export class AdminTableComponent {
  @Input() tableHeader: string[] = [];
  @Input() tableData: any[] = [];

  filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'read', label: 'Read' },
    { value: 'want to read', label: 'Want to Read' },
    { value: 'reading', label: 'Reading' },
  ];

  selectedFilter: string = 'all';
  filteredTableData: any[] = [];

  constructor(private userService: UserServicesService) {}

  ngOnInit() {
    this.filteredTableData = [...this.tableData];
    this.applyFilter();
  }

  updateStatusBook(bookId: string, event: any) {
    const newStatus = event.target.value;
    this.userService
      .updateBookStatus(bookId, newStatus, localStorage.getItem('userId')!)
      .subscribe((data) => {
        console.log(data);
        this.applyFilter();
      });
    console.log(bookId);
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredTableData = [...this.tableData];
    } else {
      this.filteredTableData = this.tableData.filter(
        (book) => book.shelve === this.selectedFilter
      );
    }
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.target.value;
    this.applyFilter();
  }
}
