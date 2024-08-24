import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }
}
