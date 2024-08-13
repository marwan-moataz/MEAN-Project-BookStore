import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<any> {
    return this.http.post<any>('http://localhost:4000/login', userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success('Login Successful', user.name);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Sorry');
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http
      .post<User>('http://localhost:4000/register', userRegister)
      .pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastrService.success(
              `welcome to the bookstore ${user.name}`,
              'Register Successful'
            );
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error, 'Register Failed');
          },
        })
      );
  }

  logOut() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
  // private userSubject = new BehaviorSubject<User>(new User());
  // public userObservable: Observable<User>;
  // constructor(private http: HttpClient, private toastrService: ToastrService) {
  //   this.userObservable = this.userSubject.asObservable();
  // }

  // login(userLogin: IUserLogin): Observable<User> {
  //   return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
  //     tap({
  //       next: (user) => {
  //         this.userSubject.next(user);
  //         this.toastrService.success(
  //           `welcome ${user.name}`,
  //           `Login Successful`
  //         );
  //       },
  //       error: (errorResponse) => {
  //         this.toastrService.error(errorResponse.error, `Login`);
  //       },
  //     })
  //   );
  // }
}
