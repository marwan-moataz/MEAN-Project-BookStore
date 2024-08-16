import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.css',
})
export class CategoriesFormComponent {
  @Input() category: Category = {
    _id: '',
    name: '',
  };
  @Input() formActionType: string = 'Add';

  categoryName = new FormControl('');
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryName.setValue(this.category.name!);
  }
  insertCategory(category: any): void {
    this.categoryService.addCategory(category).subscribe((data: any) => {
      console.log(data);
    });
  }

  updateCategory(categoryId: string, updatingData: string): void {
    this.categoryService
      .updateCategory(categoryId, updatingData)
      .subscribe((data: any) => {
        console.log(data.status);
      });
  }
  deleteCategory(categoryId?: string): void {
    this.categoryService.deleteCategory(categoryId).subscribe((data: any) => {
      console.log(data.status);
    });
  }

  formSubmitHandler(event: Event): void {
    event.preventDefault();

    if (this.formActionType === 'Add') {
      this.insertCategory(this.categoryName.value);
    } else if (this.formActionType === 'Update') {
      this.updateCategory(this.category._id!, this.categoryName.value!);
    } else if (this.formActionType === 'Delete') {
      this.deleteCategory(this.category._id);
    }
    location.reload();
  }
}
