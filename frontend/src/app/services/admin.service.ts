import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { Admin } from '../shared/models/Admins';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminSubject = new BehaviorSubject<Admin>(
    this.getAdminFromLocalStorage()
  );
  public adminObservable: Observable<Admin>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.adminObservable = this.adminSubject.asObservable();
  }

  public get currentUser(): Admin {
    return this.adminSubject.value;
  }

  login(adminLogin: IUserLogin): Observable<any> {
    return this.http.post<any>('http://localhost:4000/admin', adminLogin).pipe(
      tap({
        next: (user) => {
          this.setAdminToLocalStorage(user);
          this.adminSubject.next(user);
          this.toastrService.success('Login Successful', user.name);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Sorry');
        },
      })
    );
  }

  logOut() {
    this.adminSubject.next(new Admin());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setAdminToLocalStorage(user: Admin) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getAdminFromLocalStorage(): Admin {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as Admin;
    return new Admin();
  }
}
