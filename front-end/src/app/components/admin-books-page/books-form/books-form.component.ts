import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books-form.component.html',
  styleUrl: './books-form.component.css',
})
export class BooksFormComponent {
  @Input() book: Book = {
    _id: '',
    author: '',
    category: '',
    name: '',
    photo: '',
  };
  @Input() formActionType: string = 'Add';
  bookName = new FormControl('');
  bookAuthor = new FormControl('');
  bookCategory = new FormControl('');
  bookPhoto = new FormControl('');
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookName.setValue(this.book.name!);
    this.bookAuthor.setValue(this.book.author!);
    this.bookCategory.setValue(this.book.category!);
  }

  insertBook(book: any): void {
    this.bookService.addBook(book).subscribe((data: any) => {
      console.log(data.status);
    });
  }

  updateBook(bookId: string, updatingData: {}): void {
    this.bookService.updateBook(bookId, updatingData).subscribe((data: any) => {
      console.log(data.status);
    });
  }
  deleteBook(bookId?: string): void {
    this.bookService.deleteBook(bookId).subscribe((data: any) => {
      console.log(data.status);
    });
  }

  formSubmitHandler(event: Event): void {
    event.preventDefault();
    const formData = {
      name: this.bookName.value,
      author: this.bookAuthor.value,
      category: this.bookCategory.value,
      photo: this.bookPhoto.value,
    };

    if (this.formActionType === 'Add') {
      this.insertBook(formData);
    } else if (this.formActionType === 'Update') {
      this.updateBook(this.book._id!, formData);
    } else if (this.formActionType === 'Delete') {
      this.deleteBook(this.book._id);
    }
    location.reload();
  }
}
