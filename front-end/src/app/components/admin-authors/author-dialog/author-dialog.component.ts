import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions
  ]
})
export class AuthorDialogComponent {
  authorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.authorForm = this.fb.group({
      photo: [data?.photo || ''],
      firstName: [data?.firstName || ''],
      lastName: [data?.lastName || ''],
      dateOfBirth: [data?.dateOfBirth || '']
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.authorForm.value });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
