import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private login_url = 'http://localhost:3000/users/login';
  private users_url = 'http://localhost:3000/users';

  user = new Subject<User | null>();
  correctlySignedUp = new Subject<Boolean>();
  accountDeleted = new Subject<Boolean>();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(this.login_url, { email: email, password: password })
      .pipe(
        tap((data) => {
          if (data !== null) {
            const user: User = {
              user_token: data.user_token,
            };
            this.user.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
      );
  }

  signUp(email: string, password: string, confirmation: string) {
    return this.http
      .post<User>(this.users_url, {
        email: email,
        password: password,
        confirmation: confirmation,
      })
      .pipe(
        tap((data) => {
          this.correctlySignedUp.next(true);
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.clear();
  }

  getUser(): User | null {
    const userString: string | null = localStorage.getItem('user');
    if (userString !== null) {
      return JSON.parse(userString);
    }
    return null;
  }

  deleteAccount() {
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.getUser()?.user_token
    );
    return this.http.delete<any>(this.users_url, { headers: headers }).pipe(
      tap((data) => {
        this.accountDeleted.next(true);
      })
    );
  }
}
