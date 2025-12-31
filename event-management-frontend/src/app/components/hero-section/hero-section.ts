import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, CommonModule],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
})
export class HeroSection {
  constructor(public router: Router) {}

  isLandingPage(): boolean {
    return this.router.url === '/';
  }
}
