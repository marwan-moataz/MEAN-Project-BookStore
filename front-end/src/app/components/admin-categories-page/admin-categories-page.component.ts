import { Component } from '@angular/core';
import { AdminNavigationComponent } from '../../shared/admin-navigation/admin-navigation.component';
import { AdminTableComponent } from '../../shared/admin-table/admin-table.component';
import { BooksFormComponent } from '../admin-books-page/books-form/books-form.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { CategoriesFormComponent } from './categories-form/categories-form.component';

@Component({
  selector: 'app-admin-categories-page',
  standalone: true,
  imports: [
    AdminNavigationComponent,
    AdminTableComponent,
    BooksFormComponent,
    PaginationComponent,
    CategoriesFormComponent,
  ],
  templateUrl: './admin-categories-page.component.html',
  styleUrl: './admin-categories-page.component.css',
})
export class AdminCategoriesPageComponent {
  tableHeader: string[] = ['#', 'Category', ' Actions'];
  modalType = 'Add';
  currentPage = 1;
  pageSize = 5;
  categoriesCount: number = 0;
  moreCategories: boolean = false;
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(action?: 'nxt' | 'prev'): void {
    if (action === 'nxt') {
      this.currentPage++;
    } else if (action === 'prev') {
      this.currentPage--;
    }
    this.categoryService
      .getCategories(this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.categories = data.data;
        this.categoriesCount = data.categoriesCount;
      });
    this.moreCategories =
      this.pageSize * (this.currentPage - 1) + this.categories.length <=
      this.categoriesCount;
  }

  nextBtnOnclick = () => {
    this.currentPage++;
    this.getCategories();
  };

  previousBtnOnclick = () => {
    this.currentPage--;
    this.getCategories();
  };
}
