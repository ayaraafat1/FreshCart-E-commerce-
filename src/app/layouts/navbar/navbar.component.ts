import { AfterViewInit, Component, HostListener, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor() {}

isLogin = input<boolean>(true);
isScrolled = false;
readonly authService = inject(AuthService)

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    this.isScrolled = scrollPosition > 50; 
    console.log('Scroll position:', scrollPosition);
console.log('isScrolled:', this.isScrolled);
}

isMenuOpen = signal(false);

toggleMenu() {
  this.isMenuOpen.set(!this.isMenuOpen());
}

}
