import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.sevice';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  username: string = '';
  isMobileMenuOpen = false;

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
    console.log('Navbar component initialized');
  }

  

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  isLandingPage(): boolean {
    return this.router.url === '/';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login(redirectPath?: string): void {
    this.authService.login(redirectPath);
  }

  logout(): void {
    this.authService.logout();
  }

  getUsername(): string {
    this.username = this.authService.getUsername();
    return this.username;
  }

  getUserInitials(): string {
    const username = this.getUsername();
    if (!username) return 'U';
    return username.charAt(0).toUpperCase();
  }

  isAuthPage(): boolean {
    return false; 
  }

  register(redirectPath?: string): void {
    this.authService.register(redirectPath);
  }

}
