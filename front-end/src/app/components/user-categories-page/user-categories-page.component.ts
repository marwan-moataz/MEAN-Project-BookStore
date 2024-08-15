import { Component } from '@angular/core';
import { CategoryCardComponent } from './category-card/category-card.component';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-user-categories-page',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './user-categories-page.component.html',
  styleUrl: './user-categories-page.component.css',
})
export class UserCategoriesPageComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories(1, 100).subscribe((categories: any) => {
      this.categories = categories.data;
    });
  }
}
