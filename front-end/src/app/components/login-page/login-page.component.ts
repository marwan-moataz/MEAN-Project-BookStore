import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserServicesService } from '../../services/user.services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.userService
      .login({
        email: this.fc['email'].value,
        password: this.fc['password'].value,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: () => {},
      });
  }

  // this.userService;
  // this.userService
  // .login({
  //   email: this.fc['email'].value,
  //   password: this.fc['password'].value,
  // })
  // .subscribe(() => {
  //   this.router.navigateByUrl(this.returnUrl);
  // });
}
