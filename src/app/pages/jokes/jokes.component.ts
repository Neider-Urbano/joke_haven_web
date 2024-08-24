import { JokesService } from './../../service/jokes.service';
import { Component, signal } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
})
export class JokesComponent {
  user!: Omit<User, 'password' | 'role'>;
  joke = signal<string>('Cargando chiste...');
  errorMessage = signal<string>('');

  constructor(
    private authService: AuthService,
    private jokesService: JokesService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data) => {
        if (data) {
          this.user = data.user;
          this.fetchNewJoke();
        } else {
          this.errorMessage.set('Error fetching user data.');
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.errorMessage.set('Error fetching user data.');
      },
    });
  }

  fetchNewJoke(): void {
    this.errorMessage.set('');

    this.jokesService.getRandomJoke().subscribe({
      next: (response) => {
        this.joke.set(response.joke);
      },
      error: (error) => {
        console.error('Error fetching joke:', error);
        this.errorMessage.set('Error fetching joke. Please try again later.');
      },
    });
  }

  saveToFavorites(): void {
    this.errorMessage.set(this.jokesService.addToFavorite(this.joke()));
  }
}
