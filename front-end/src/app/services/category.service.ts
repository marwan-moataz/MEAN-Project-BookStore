import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../shared/loader/loader.service';
import { finalize, Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3333/api/categories';

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  getCategories(page: number = 1, limit: number = 5): Observable<any> {
    this.loaderService.show();
    return this.http
      .get<any>(this.apiUrl + `?limit=${limit}&page=${page}`)
      .pipe(finalize(() => this.loaderService.hide()));
  }

  addCategory(category: Category): Observable<Category> {
    this.loaderService.show();
    return this.http
      .post<Category>(this.apiUrl, { name: category })
      .pipe(finalize(() => this.loaderService.hide()));
  }

  updateCategory(categoryId: string, category: string): Observable<Category> {
    this.loaderService.show();
    return this.http
      .patch<Category>(`${this.apiUrl}/${categoryId}`, { name: category })
      .pipe(finalize(() => this.loaderService.hide()));
  }

  deleteCategory(id?: string): Observable<void> {
    this.loaderService.show();
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(finalize(() => this.loaderService.hide()));
  }
}
