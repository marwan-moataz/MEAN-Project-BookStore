import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
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

  constructor(private fb: FormBuilder) {}

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
}
