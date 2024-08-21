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
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (response: any) => {
          this.currentUser = response.data.user;

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

  getStars(rating: number): number[] {
    return Array(Math.ceil(rating))
      .fill(0)
      .map((x, i) => i);
  }
}
