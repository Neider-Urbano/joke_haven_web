import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService
      .register(this.username, this.email, this.password)
      .subscribe({
        next: () => {
          this.successMessage = 'User saved';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'User already exists';
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        },
      });
  }
}
