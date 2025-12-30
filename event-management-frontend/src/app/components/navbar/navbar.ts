import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../../services/keycloak/keycloak';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  isMobileMenuOpen = false;

  constructor(
    public router: Router,
    public keycloakService: KeycloakService
  ) {
    console.log('Navbar component initialized');
  }

  testClick() {
    console.log('TEST CLICK WORKS!');
    alert('Button clicked!');
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

  isAuthenticated(): boolean {
    return this.keycloakService.isAuthenticated();
  }

  login(redirectPath?: string): void {
    this.keycloakService.login(redirectPath);
  }

  logout(): void {
    this.keycloakService.logout();
  }

  getUsername(): string {
    console.log('Fetching username from KeycloakService');
    return this.keycloakService.getUsername();
  }

  getUserInitials(): string {
    const username = this.getUsername();
    if (!username) return 'U';
    return username.charAt(0).toUpperCase();
  }

  isAuthPage(): boolean {
    return false; 
  }
}
