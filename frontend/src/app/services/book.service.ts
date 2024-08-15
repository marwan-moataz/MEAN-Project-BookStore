import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../shared/models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `http://localhost:4000/books/:bookId`;
  constructor(private http: HttpClient) {}

  getBooks(page: number = 1, limit: number = 5): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + `?limit=${limit}&page=${page}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(bookId: string, book: {}): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${bookId}`, book);
  }

  deleteBook(id?: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
