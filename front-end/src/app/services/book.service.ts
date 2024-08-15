import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'; // Import finalize operator
import { Book, BookReviews } from '../models/book.model';
import { LoaderService } from '../shared/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3333/api/books';

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getBooks(page: number = 1, limit: number = 5): Observable<Book[]> {
    this.loaderService.show();
    return this.http
      .get<Book[]>(this.apiUrl + `?limit=${limit}&page=${page}`)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  getSingleBooks(bookId: string): Observable<Book[]> {
    this.loaderService.show();
    return this.http
      .get<Book[]>(this.apiUrl + '/' + bookId)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  addBook(book: Book): Observable<Book> {
    this.loaderService.show();
    return this.http
      .post<Book>(this.apiUrl, book)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  insertReview(review: BookReviews, bookId: string): Observable<Book> {
    this.loaderService.show();
    return this.http
      .post<Book>(this.apiUrl + `/review/${bookId}`, review)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  updateBook(bookId: string, book: {}): Observable<Book> {
    this.loaderService.show();
    return this.http
      .patch<Book>(`${this.apiUrl}/${bookId}`, book)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  deleteBook(id?: string): Observable<void> {
    this.loaderService.show();
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(finalize(() => this.loaderService.hide()));
  }
}
