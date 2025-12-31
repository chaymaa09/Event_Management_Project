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
      
      // Navigate to stored destination after successful login
      if (isPlatformBrowser(this.platformId)) {
        try {
          const redirect = sessionStorage.getItem('auth_redirect');
          if (redirect && redirect !== this.router.url) {
            sessionStorage.removeItem('auth_redirect');
            this.router.navigateByUrl(redirect);
          }
        } catch { }
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



