import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin.interface';
import { User } from '../shared/models/user.model';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Book } from '../shared/models/book.model';

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
    return this.http.post<any>('http://localhost:3333/login', userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success('Login Successful', user.name, {
            positionClass: 'toast-bottom-right',
          });
        },
        error: (errorResponse) => {
          this.toastrService.error('Invalid Email or Password', 'Try again', {
            positionClass: 'toast-bottom-right',
          });
        },
      })
    );
  }
  updateBookStatus(
    bookId: string,
    newStatus: string,
    userId: string
  ): Observable<any> {
    return this.http.patch(`http://localhost:3333/books/${userId}/status`, {
      shelve: newStatus,
      bookId,
    });
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3333/user/${userId}`);
  }

  getBooksByShelve(shelve: string): Observable<any> {
    return this.http.get(`http://localhost:3333/books?shelve=${shelve}`);
  }
  getSingleBooks(bookId: string): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3333/api/books/' + bookId);
  }

  register(formData: IUserRegister): Observable<User> {
    return this.http
      .post<User>('http://localhost:3333/register', formData)
      .pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastrService.success(
              `welcome to the bookstore ${user.name}`,
              'Register Successful',
              { positionClass: 'toast-bottom-right' }
            );
          },
          error: (errorResponse) => {
            this.toastrService.error(
              errorResponse.error.message,
              'Register Failed',
              { positionClass: 'toast-bottom-right' }
            );
          },
        })
      );
  }

  logOut() {
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(new User());
    localStorage.removeItem('userId');
  }

  private setUserToLocalStorage(user: User) {
    const userData = {
      email: user.email,
      userId: user.id,
      name: user.name,
      token: user.token,
      book: user.book,
      profilePicture: user.profilePicture,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem('userId', userData.userId);
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
