import { Component, Input } from '@angular/core';
import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input() bookCover: string = 'hover me';
  @Input() insideBook: string = 'See Books';
  @Input() category: Category = {};
  constructor(private router: Router) {}
  showSingleCategoryPage() {
    this.router.navigate(['/categories/', this.category.name]);
  }
}
