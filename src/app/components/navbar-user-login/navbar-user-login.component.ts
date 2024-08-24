import { JokesService } from './../../service/jokes.service';
import { Component, Input, signal } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar-user-login',
  templateUrl: './navbar-user-login.component.html',
  styleUrls: ['./navbar-user-login.component.css'],
})
export class NavbarUserLoginComponent {
  @Input({ required: true }) user!: Pick<User, 'username'>;

  menuOpen = signal(false);
  dropdownOpen = signal(false);
  favoritesModalOpen = signal(false);

  constructor(
    private authService: AuthService,
    private jokesService: JokesService
  ) {}

  jokes = this.jokesService.jokesFavorites;
  totalJokes = this.jokesService.totalJokesFavorites;

  ngOnInit(): void {
    this.jokesService.totalFavorites();
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  toggleDropdown(): void {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  openFavoritesModal(): void {
    this.favoritesModalOpen.set(true);
  }

  closeFavoritesModal(): void {
    this.favoritesModalOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
  }

  removeFromFavorites(id: string): void {
    this.jokesService.deleteJoke(id).subscribe({
      next: () => {
        this.jokesService.totalFavorites();
      },
      error: () => {},
    });
  }
}
