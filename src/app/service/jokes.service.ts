import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JokeFavorites } from '../models/JokeFavorites.model';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  jokesFavorites = signal<JokeFavorites>([]);
  totalJokesFavorites = signal<number>(0);

  constructor(private http: HttpClient) {}

  totalFavorites(): void {
    this.getFavoriteJokes().subscribe({
      next: (data) => {
        this.jokesFavorites.set(data.jokes);
        this.totalJokesFavorites.set(data.jokes.length);
      },
      error: () => {
        this.jokesFavorites.set([]);
        this.totalJokesFavorites.set(0);
      },
    });
  }

  getFavoriteJokes(): Observable<{ jokes: JokeFavorites }> {
    const token = localStorage.getItem('token');
    return this.http.get<{ jokes: JokeFavorites }>(
      `${environment.apiUrl}/jokes/favorites`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  saveJokeToFavorites(joke: string): Observable<{ message: string }> {
    const token = localStorage.getItem('token');
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/jokes/favorites`,
      { joke },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  addToFavorite(joke: string): string {
    let message = '';
    this.saveJokeToFavorites(joke).subscribe({
      next: () => {
        this.totalFavorites();
      },
      error: (error) => {
        console.error('Error saving joke to favorites:', error);
        message = 'Failed to save joke. Please try again later.';
      },
    });

    return message;
  }

  getRandomJoke(): Observable<{ joke: string }> {
    const token = localStorage.getItem('token');
    return this.http
      .get<{ joke: string }>(`${environment.apiUrl}/jokes/random`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching joke:', error);
          return of({ joke: 'Error fetching joke. Please try again later.' });
        })
      );
  }

  deleteJoke(jokeId: string): Observable<{ message: string }> {
    const token = localStorage.getItem('token');

    return this.http
      .delete<{ message: string }>(
        `${environment.apiUrl}/jokes/favorites/${jokeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error deleting joke:', error);
          return of();
        })
      );
  }
}
