import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserServicesService } from '../../services/user.services';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordMatchValidator } from '../../shared/validators/passwordMatchValid';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  registerForm!: FormGroup;
  isSubmitted = false;
  selectedFile!: File;
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required, Validators.minLength(5)],
        confirmPassword: ['', Validators.required],
        profilePicture: ['', Validators.required],
      },
      {
        Validators: PasswordMatchValidator('password', 'confirmPassword'),
      }
    );
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      profilePicture: fv.profilePicture,
    };

    this.userService.register(user).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}

// onFileSelected(event: any) {
//   this.selectedFile = event.target.files[0];
// }

// onFileUpload() {
//   const imageBlob = this.fileInput.nativeElement.files[0];
//   const file = new FormData();
//   file.set('file', imageBlob);
//   this.http
//     .post('http://localhost:4000/register', file)
//     .subscribe((res) => console.log(res));
// }

// submit() {
//   this.isSubmitted = true;
//   if (this.registerForm.invalid) return;

//   const formData = new FormData();
//   const fv = this.registerForm.value;

//   // Append form fields to FormData
//   formData.append('name', fv.name);
//   formData.append('email', fv.email);
//   formData.append('password', fv.password);
//   formData.append('confirmPassword', fv.confirmPassword);
//   formData.append('profilePicture', fv.profilePicture);

//   // Append the selected file to FormData
//   // if (this.selectedFile) {
//   //   formData.append('profilePicture', this.selectedFile);
//   // }

//   // Send FormData object to the service
//   this.userService.register(formData).subscribe((_) => {
//     this.router.navigateByUrl(this.returnUrl);
//   });
// }
