import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.successMessage = 'User saved';

        localStorage.setItem('token', response.token);
        this.router.navigate(['/jokes']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      },
    });
  }
}
