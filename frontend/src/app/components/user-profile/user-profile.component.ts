import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserServicesService } from '../../services/user.services.service';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  selector: 'app-user-books',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserBooksComponent implements OnInit {
  booksForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserServicesService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserBooks();
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
    const currentUser = this.userService.currentUser;
    currentUser.book.forEach(
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
  }

  updateBookStatus(index: number) {
    const selectedBook = this.books.at(index);
    const bookId = selectedBook.get('_id')?.value;
    const shelve = selectedBook.get('shelve')?.value;

    this.userService.updateBookStatus(bookId, shelve).subscribe((response) => {
      console.log('Book status updated successfully', response);
    });
  }
}
