import { Component, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnDestroy {
  isMobileMenuOpen = false;
  currentUser: User | null = null;
  private userSub?: Subscription;
  isLoggedIn: boolean = false;

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
    this.userSub = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
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
    return this.authService.isAuthenticated;
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    const initial = this.currentUser.name?.charAt(0) || '';
    return initial.toUpperCase();
  }

  isAuthPage(): boolean {
    return this.router.url.startsWith('/auth');
  }


  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
