import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BooksFormComponent } from '../admin-books-page/book-form/book-form.component';
import { TableData } from '../../shared/models/tableData.model';
import { Book } from '../../shared/models/book.model';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [CommonModule, BooksFormComponent],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css',
})
export class AdminTableComponent {
  @Input() tableHeader: string[] = [];
  @Input() tableData: TableData[] = [];
  modalType: string = '';
}
