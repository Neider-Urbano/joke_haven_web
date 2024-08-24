import { Component, effect, signal } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent {
  constructor(private themeService: ThemeService) {}

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
