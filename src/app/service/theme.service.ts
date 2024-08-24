import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = signal(
    document.documentElement.classList.contains('dark')
  );

  constructor() {
    effect(() => {
      if (this.darkMode()) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleDarkMode(): void {
    this.darkMode.set(!this.darkMode());
  }

  isDarkMode(): boolean {
    return this.darkMode();
  }
}
