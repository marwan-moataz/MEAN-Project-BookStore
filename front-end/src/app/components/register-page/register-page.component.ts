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
