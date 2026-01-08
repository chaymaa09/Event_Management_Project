import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import { AuthService } from './services/auth/auth.sevice';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  isLoggedIn = false;
  username = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();

      // Ensure Keycloak user also exists in backend DB
      void this.authService.loadUser();
      
      // Navigate to stored destination after successful login
      if (isPlatformBrowser(this.platformId)) {
        try {
          const redirect = sessionStorage.getItem('auth_redirect');
          if (redirect && redirect !== this.router.url) {
            sessionStorage.removeItem('auth_redirect');
            this.router.navigateByUrl(redirect);
            return;
          }
        } catch { }

        // Default post-login landing
        // Only redirect to /home when the *actual* browser URL is root.
        // On deep-link refresh (e.g. /profile), Router may briefly report '/'
        // during bootstrap; do not override the intended route.
        const browserPath = window.location.pathname;
        if ((this.router.url === '/' || this.router.url === '') && (browserPath === '/' || browserPath === '')) {
          this.router.navigateByUrl('/home');
        }
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }
  login(): void {
    this.authService.login();
  }

  
}



