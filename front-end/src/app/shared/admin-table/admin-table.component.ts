import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BooksFormComponent } from '../../components/admin-books-page/books-form/books-form.component';
import { TableData } from '../../models/tableData.model';
import { CategoriesFormComponent } from '../../components/admin-categories-page/categories-form/categories-form.component';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, BooksFormComponent, CategoriesFormComponent],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css',
})
export class AdminTableComponent {
  @Input() tableHeader: string[] = [];
  @Input() tableData: TableData[] = [];
  @Input() adminPage: 'books' | 'categories' | 'authors' = 'books';
  modalType: string = '';

  setDefaultImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src =
      'https://authors.bookfunnel.com/wp-content/uploads/2017/02/Soothing_Clouds.jpg'; // Path to your default image
  }
}
