import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuOpen = signal(false);

  toggleMenu():void {
    this.menuOpen.set(!this.menuOpen());
  }
}
