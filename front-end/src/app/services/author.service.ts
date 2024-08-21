import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'http://localhost:3333/api/authors/';

  constructor(private http: HttpClient) {}

  getAuthors(page: number = 1, limit: number = 25): Observable<any> {
    return this.http.get<any>(this.apiUrl + `?limit=${limit}&page=${page}`);
  }

  getSingleAuthor(id: string): Observable<Author> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.apiUrl, author);
  }

  updateAuthor(id: string, authorData: Author): Observable<any> {
    return this.http.patch<Author>(`${this.apiUrl}/${id}`, authorData);
  }

  deleteAuthor(id?: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
