import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ toke: string }> {
    return this.http.post<{ toke: string }>(
      `${environment.apiUrl}/users/login`,
      {
        email,
        password,
      }
    );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/users/register`,
      {
        username,
        email,
        password,
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUser(): Observable<{ user: User } | null> {
    const token = localStorage.getItem('token');
    return this.http
      .get<{ user: User }>(`${environment.apiUrl}/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user data:', error);
          this.router.navigate(['/login']);
          return of(null);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${environment.apiUrl}/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map(() => true),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}
